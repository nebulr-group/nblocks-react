import { AxiosInstance } from "axios";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { NblocksStorage } from "./Storage";
import * as jose from "jose";
import { GetKeyFunction } from "jose/dist/types/types";
import { LibConfig } from "../models/lib-config";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};

export type OpenIDClaim = {
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  picture?: string;
  tenant_id?: string;
  tenant_name?: string;
  tid: string;
  iat: number;
  exp: number;
  aud: string[];
  iss: string;
  sub: string;
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
    token: "/oauth/token",
    refresh: "/oauth/refresh",
    jwks: "/.well-known/jwks.json",
  };

  private readonly ENDPOINTS = {
    password: "/auth-proxy/password",
    user: "/auth-proxy/user",
    tenantUsers: "/auth-proxy/tenantUsers",
    currentUser: "/auth/currentUser",
    startMfaUserSetup: "/auth-proxy/startMfaUserSetup",
    commitMfaCode: "/auth-proxy/commitMfaCode",
    finishMfaUserSetup: "/auth-proxy/finishMfaUserSetup",
    resetUserMfaSetup: "/auth-proxy/resetUserMfaSetup",
  };

  private _accessTokenExpires?: number;
  private _refreshTokenExpires?: number;
  private _idToken?: OpenIDClaim;

  private readonly _JWKS: GetKeyFunction<
    jose.JWSHeaderParameters,
    jose.FlattenedJWSInput
  >;

  private readonly EXPECTED_ISSUER = "auth.nblocks.cloud";
  private readonly OAUTH_SCOPES = "openid profile email";

  //TODO these variables should come from config
  private readonly oAuthBaseURI: string;
  private readonly appId: string;
  private readonly redirectUri: string;

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;

  private static ACCCESS_TOKEN = "OAUTH_ACCESS_TOKEN";
  private static OPENID_TOKEN = "OPENID_TOKEN";
  private static MFA_TOKEN_KEY = "MFA_TOKEN";
  private static REFRESH_TOKEN = "OAUTH_REFRESH_TOKEN";

  constructor(httpClient: AxiosInstance, debug: boolean, config: LibConfig) {
    this.debug = debug;
    this.httpClient = httpClient;

    this.appId = config.appId!;
    this.oAuthBaseURI = config.oAuthBaseURI;
    this.redirectUri = config.oauthRedirectUri;

    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + this.OAUTH_ENDPOINTS.jwks)
    );
    this._JWKS = JWKS;

    this.restoreTokensFromLocalStorage();
  }

  log(msg: string): void {
    if (this.debug) {
      console.log(`OAuthService: ${msg}`);
    }
  }

  private async restoreTokensFromLocalStorage(): Promise<void> {
    try {
      const [openIdToken, accessToken, refreshToken] = [
        OAuthService.getOpenIDToken(),
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
      const authenticated = await this.authenticated();
      if (authenticated) {
        return true;
      }
    }

    return false;
  }

  getAuthorizeUrl(state?: string): string {
    const url = `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.authorize}?response_type=code&client_id=${this.appId}&redirect_uri=${this.redirectUri}&scope=${this.OAUTH_SCOPES}`;
    return state ? `${url}&state=${state}` : url;
  }

  async authorizeUser(
    username: string,
    password: string,
    scope: string,
    client_id: string,
    redirect_uri: string,
    response_type: string
  ): Promise<boolean> {
    // Obtain id_token for end-user and access_code for obtaining access_token
    const response = await this.httpClient.post<{
      code: string;
      id_token: string;
    }>(
      this.OAUTH_ENDPOINTS.authorize,
      {
        username,
        password,
        response_type,
        client_id,
        redirect_uri,
        scope,
      },
      { baseURL: this.oAuthBaseURI }
    );
    if (!response.data.id_token && !response.data.code)
      throw new Error("Wrong credentials");

    try {
      const idTokenVerify = await this._verifyToken(response.data.id_token);

      await this.authorizeClient(
        this.appId,
        "authorization_code",
        response.data.code
      );

      this._idToken = idTokenVerify.payload as OpenIDClaim;
      OAuthService.setOpenIDToken(response.data.id_token);

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Authentication failed!");
    }
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

  async authorizeClient(client_id: string, grant_type: string, code: string) {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>(
      this.OAUTH_ENDPOINTS.token,
      {
        client_id,
        grant_type,
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
        `AccessToken rexpires in ${
          expiresInMs / 1000
        } seconds. Therefore we refresh it after ${threshold / 1000} seconds`
      );
      const timer = setTimeout(async () => {
        await this.refreshTokens();
        this.setRefreshTokenScheduler();
      }, threshold);
    }
  }

  async authenticated(): Promise<boolean> {
    // User is authenticated if the application has obtained id_token
    const open_id = OAuthService.getOpenIDToken();

    if (!open_id) {
      return false;
    }
    return true;
  }

  async refreshTokens(): Promise<boolean> {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      tokenType: string;
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

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Authentication failed!");
    }
  }

  async sendResetPasswordLink(username: string): Promise<void> {
    await this.httpClient.post<void>(this.ENDPOINTS.password, { username });
  }

  async updatePassword(token: string, password: string): Promise<void> {
    await this.httpClient.put(this.ENDPOINTS.password, { token, password });
  }

  async commitMfaCode(mfaCode: string): Promise<void> {
    const result = await this.httpClient.post<{ mfaToken: string }>(
      this.ENDPOINTS.commitMfaCode,
      { mfaCode }
    );
    OAuthService.setMfaToken(result.data.mfaToken);
  }

  async startMfaUserSetup(phoneNumber: string): Promise<void> {
    await this.httpClient.post<void>(this.ENDPOINTS.startMfaUserSetup, {
      phoneNumber,
    });
  }

  /**
   * Finish setting up MFA for the user and the user is hereby authenticated with MFA aswell.
   * @param mfaCode
   * @returns The backup code to be saved for future reference
   */
  async finishMfaUserSetup(mfaCode: string): Promise<string> {
    const result = await this.httpClient.post<{
      mfaToken: string;
      backupCode: string;
    }>(this.ENDPOINTS.finishMfaUserSetup, { mfaCode });

    OAuthService.setMfaToken(result.data.mfaToken);
    return result.data.backupCode;
  }

  async resetUserMfaSetup(backupCode: string): Promise<void> {
    await this.httpClient.post(this.ENDPOINTS.resetUserMfaSetup, {
      backupCode,
    });
  }

  async listUsers(): Promise<AuthTenantUserResponseDto[]> {
    const response = await this.httpClient.get<AuthTenantUserResponseDto[]>(
      this.ENDPOINTS.tenantUsers
    );
    return response.data;
  }

  /**
   * This method operates on the ID token and expects sub to be TenantUserId
   * @returns
   */
  currentUserId(): string | undefined {
    return this._idToken?.sub;
  }

  async currentUser(): Promise<AuthTenantUserResponseDto> {
    // In future we can make it possible to obtain claims data from oauth's /userinfo endpoint
    // This is by specification
    // for now it reads data from the id_token if pressent

    const response = await this.httpClient.get<AuthTenantUserResponseDto>(
      this.ENDPOINTS.currentUser
    );
    return response.data;
  }

  async updateCurrentUser(userProfile: UpdateUserProfileArgs): Promise<any> {
    const response = await this.httpClient.put<any>(
      this.ENDPOINTS.user,
      userProfile
    );
    return response.data;
  }

  static async hasFullAuthContext(): Promise<boolean> {
    return !!this.getAccessToken() && !!this.getOpenIDToken();
  }
  // Setters

  static setAccessToken(token: string): void {
    NblocksStorage.setItem(this.ACCCESS_TOKEN, token);
  }

  static setOpenIDToken(token: string): void {
    NblocksStorage.setItem(this.OPENID_TOKEN, token);
  }

  static setMfaToken(token: string): void {
    NblocksStorage.setItem(this.MFA_TOKEN_KEY, token);
  }

  static setRefreshToken(token: string): void {
    NblocksStorage.setItem(this.REFRESH_TOKEN, token);
  }

  // static setTenantUserId(userId: string): void {
  //   NblocksStorage.setItem(this.TENANT_USER_ID_KEY, userId);
  // }

  // Getters
  static getRefreshToken(): string | null {
    return NblocksStorage.getItem(this.REFRESH_TOKEN);
  }

  static getAccessToken(): string | null {
    return NblocksStorage.getItem(this.ACCCESS_TOKEN);
  }

  static getOpenIDToken(): string | null {
    return NblocksStorage.getItem(this.OPENID_TOKEN);
  }

  // static getTenantUserId(): string | null {
  //   return NblocksStorage.getItem(this.TENANT_USER_ID_KEY);
  // }

  static clearAuthStorage(): void {
    NblocksStorage.removeItem(this.ACCCESS_TOKEN);
    NblocksStorage.removeItem(this.OPENID_TOKEN);
    NblocksStorage.removeItem(this.REFRESH_TOKEN);
  }
}
