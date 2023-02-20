import { AxiosInstance } from "axios";
import { NblocksStorage } from "./Storage";
import * as jose from "jose";
import { GetKeyFunction } from "jose/dist/types/types";
import { LibConfig } from "../models/lib-config";
import { MfaState } from "./AuthService";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};

export type OpenIDClaim = {
  iat: number;
  exp: number;
  aud: string[];
  iss: string;
  sub: string;

  // email scope
  email?: string;
  email_verified?: boolean;

  // profile scope
  name?: string;
  family_name?: string;
  given_name?: string;
  preferred_username?: string;
  locale?: string;
  
  // onboarding scope
  onboarded?: boolean;

  // tenant scope
  tenant_id?: string;
  tenant_name?: string;
  tenant_locale?: string;
  tenant_logo?: string;
};

export type RefreshTokenClaim = {
  tid: string;
};

export type AccesTokenClaim = {
  scope: string;
  role: string;
  aid: string;
  tid: string;
  iat: number;
  exp: number;
  aud: string[];
  iss: string;
  sub: string;
};

export class OAuthService {
  private readonly OAUTH_ENDPOINTS = {
    authorize: "/authorize",
    token: "/token",
    refresh: "/token",
    jwks: "/.well-known/jwks.json",
  };

  private readonly AUTH_API_ENDPOINTS = {
    authenticate: "/auth/authenticate",
    tenantUsers: "/auth/tenantUsers",
    handover: "/auth/chooseTenantUser",
    logout: "/auth/logout",
  };

  private _accessTokenExpires?: number;
  private _refreshTokenExpires?: number;
  private _idToken?: OpenIDClaim;
  private _initializePromise: Promise<void>;

  private readonly _JWKS: GetKeyFunction<
    jose.JWSHeaderParameters,
    jose.FlattenedJWSInput
  >;

  private readonly EXPECTED_ISSUER = "auth.nblocks.cloud";
  private readonly OAUTH_SCOPES = "openid profile email";

  private readonly oAuthBaseURI: string;
  private readonly appId: string;
  private readonly redirectUri: string;

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;

  private static ACCCESS_TOKEN = "OAUTH_ACCESS_TOKEN";
  private static REFRESH_TOKEN = "OAUTH_REFRESH_TOKEN";
  private static ID_TOKEN = "ID_TOKEN";

  constructor(httpClient: AxiosInstance, config: LibConfig) {
    this.debug = config.debug;
    this.httpClient = httpClient;

    this.appId = config.appId!;
    this.oAuthBaseURI = config.oAuthBaseURI;
    this.redirectUri = config.oauthRedirectUri;

    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + this.OAUTH_ENDPOINTS.jwks)
    );
    this._JWKS = JWKS;

    this._initializePromise = this.restoreTokensFromLocalStorage();
  }

  log(msg: string): void {
    if (this.debug) {
      console.log(`OAuthService: ${msg}`);
    }
  }

  private async restoreTokensFromLocalStorage(): Promise<void> {
    try {
      const [openIdToken, accessToken, refreshToken] = [
        OAuthService.getIDToken(),
        OAuthService.getAccessToken(),
        OAuthService.getRefreshToken(),
      ];

      if (openIdToken) {
        const decoded = await this._verifyToken(openIdToken);
        this._idToken = decoded.payload as OpenIDClaim;
      }

      if (accessToken) {
        const decoded = await this._verifyToken(accessToken);
        this._accessTokenExpires = decoded.payload.exp;
      }

      if (refreshToken) {
        const decoded = await this._verifyToken(refreshToken);
        this._refreshTokenExpires = decoded.payload.exp;
      }

      // Start scheduler
      this.setRefreshTokenScheduler();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Application boot should start by calling this method
   * @returns
   */
  async checkCurrentUserAuthenticated(): Promise<boolean> {
    const hasFullOAuthContext = await OAuthService.hasFullAuthContext();

    if (hasFullOAuthContext) {
      const authenticated = await this._authenticated();
      if (authenticated) {
        return true;
      }
    }

    return false;
  }

  /** TODO change to simplified login url? auth-api/url/login/:appID */
  getAuthorizeUrl(state?: string): string {
    const url = `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.authorize}?response_type=code&client_id=${this.appId}&redirect_uri=${this.redirectUri}&scope=${this.OAUTH_SCOPES}`;
    return state ? `${url}&state=${state}` : url;
  }

  getHandoverUrl(tenantUserId?: string): string {
    return `${this.oAuthBaseURI}${this.AUTH_API_ENDPOINTS.handover}/${tenantUserId}`;
  }

  getIdToken(): OpenIDClaim | undefined {
    return this._idToken;
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<{ mfaState: MfaState; tenantUserId?: string }> {
    // Obtain id_token for end-user and access_code for obtaining access_token
    const response = await this.httpClient.post<{
      session: string;
      expiresIn: number;
      mfaState: MfaState;
      tenantUserId?: string;
    }>(
      this.AUTH_API_ENDPOINTS.authenticate,
      {
        username,
        password,
      },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );

    const { session, mfaState, tenantUserId } = response.data;

    if (!session) {
      throw new Error("Wrong credentials");
    }

    return { mfaState, tenantUserId };
  }

  async listUsers(): Promise<AuthTenantUserResponseDto[]> {
    const response = await this.httpClient.get<AuthTenantUserResponseDto[]>(
      this.AUTH_API_ENDPOINTS.tenantUsers,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return response.data;
  }

  /**
   * JOSE methods throws Errors
   * @param token
   * @returns
   */
  private async _verifyToken(
    token: string
  ): Promise<jose.JWTVerifyResult & jose.ResolvedKey> {
    // Check validity of the JWTs received
    const result = await jose.jwtVerify(token, this._JWKS, {
      issuer: this.EXPECTED_ISSUER,
      audience: [this.appId],
    });

    return result;
  }

  async getTokens(code: string): Promise<boolean> {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
      expiresIn: number;
      id_token?: string;
    }>(
      this.OAUTH_ENDPOINTS.token,
      {
        client_id: this.appId,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUri,
        code,
      },
      { baseURL: this.oAuthBaseURI }
    );

    if (!response.data.access_token && !response.data.refresh_token!) {
      throw new Error("Wrong credentials!");
    }

    try {
      const decodedAccessToken = await this._verifyToken(
        response.data.access_token
      );
      this._accessTokenExpires = decodedAccessToken.payload.exp!;
      OAuthService.setAccessToken(response.data.access_token);

      const decodedRefreshToken = await this._verifyToken(
        response.data.refresh_token
      );
      this._refreshTokenExpires = decodedRefreshToken.payload.exp!;
      OAuthService.setRefreshToken(response.data.refresh_token);

      if (response.data.id_token) {
        const idTokenVerify = await this._verifyToken(response.data.id_token);
        this._idToken = idTokenVerify.payload as OpenIDClaim;
        OAuthService.setIDToken(response.data.id_token);
      }

      // Schedule a future that will refresh the tokens
      this.setRefreshTokenScheduler();

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Authentication failed!");
    }
  }

  setRefreshTokenScheduler(): void {
    if (this._accessTokenExpires) {
      const expiresInMs = this._accessTokenExpires * 1000 - Date.now();
      const threshold = expiresInMs * 0.8;
      this.log(
        `AccessToken expires in ${
          expiresInMs / 1000
        } seconds. Therefore we refresh it after ${threshold / 1000} seconds`
      );
      const timer = setTimeout(async () => {
        await this.refreshTokens();
        this.setRefreshTokenScheduler();
      }, threshold);
    }
  }

  private async _authenticated(): Promise<boolean> {
    // User is authenticated if the application has obtained id_token
    await this._initializePromise;
    const open_id = this._idToken;

    if (!open_id) {
      return false;
    }
    return true;
  }

  async refreshTokens(): Promise<boolean> {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
      expiresIn: number;
      id_token?: string;
    }>(
      this.OAUTH_ENDPOINTS.refresh,
      {
        client_id: this.appId,
        grant_type: "refresh_token",
        refresh_token: OAuthService.getRefreshToken(),
      },
      { baseURL: this.oAuthBaseURI }
    );

    if (!response.data.access_token && !response.data.refresh_token!) {
      throw new Error("Wrong credentials!");
    }

    try {
      const decodedAccessToken = await this._verifyToken(
        response.data.access_token
      );
      this._accessTokenExpires = decodedAccessToken.payload.exp!;
      OAuthService.setAccessToken(response.data.access_token);

      const decodedRefreshToken = await this._verifyToken(
        response.data.refresh_token
      );
      this._refreshTokenExpires = decodedRefreshToken.payload.exp!;
      OAuthService.setRefreshToken(response.data.refresh_token);

      if (response.data.id_token) {
        const idTokenVerify = await this._verifyToken(response.data.id_token);

        this._idToken = idTokenVerify.payload as OpenIDClaim;
        OAuthService.setIDToken(response.data.id_token);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Token Refresh failed!");
    }
  }

  static async hasFullAuthContext(): Promise<boolean> {
    return !!this.getAccessToken() && !!this.getIDToken();
  }
  // Setters

  static setAccessToken(token: string): void {
    NblocksStorage.setItem(this.ACCCESS_TOKEN, token);
  }

  static setIDToken(token: string): void {
    NblocksStorage.setItem(this.ID_TOKEN, token);
  }

  static setRefreshToken(token: string): void {
    NblocksStorage.setItem(this.REFRESH_TOKEN, token);
  }

  // Getters
  static getRefreshToken(): string | null {
    return NblocksStorage.getItem(this.REFRESH_TOKEN);
  }

  static getAccessToken(): string | null {
    return NblocksStorage.getItem(this.ACCCESS_TOKEN);
  }

  static getIDToken(): string | null {
    return NblocksStorage.getItem(this.ID_TOKEN);
  }

  static clearAuthStorage(): void {
    NblocksStorage.removeItem(this.ACCCESS_TOKEN);
    NblocksStorage.removeItem(this.ID_TOKEN);
    NblocksStorage.removeItem(this.REFRESH_TOKEN);
  }
}
