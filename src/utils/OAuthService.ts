import { AxiosInstance } from "axios";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { NblocksStorage } from "./Storage";
import * as jose from "jose";

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
    startMfaUserSetup: "/auth-proxy/startMfaUserSetup",
    commitMfaCode: "/auth-proxy/commitMfaCode",
    finishMfaUserSetup: "/auth-proxy/finishMfaUserSetup",
    resetUserMfaSetup: "/auth-proxy/resetUserMfaSetup",
  };

  private _accessTokenExpires: number;
  private _refreshTokenExpires: number;
  private _idToken: OpenIDClaim;

  //TODO these variables should come from config
  private readonly oAuthBaseURI = "http://localhost:3070";
  private readonly issuer = "auth.nblocks.cloud";
  private readonly appId = "633402fdf28d8e00252948b1";
  private readonly redirectUri = "http://localhost:8081/auth/login";
  private readonly scopes = "openid profile email";

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;

  private static ACCCESS_TOKEN = "OAUTH_ACCESS_TOKEN";
  private static OPENID_TOKEN = "OPENID_TOKEN";
  private static MFA_TOKEN_KEY = "MFA_TOKEN";
  private static REFRESH_TOKEN = "OAUTH_REFRESH_TOKEN";

  constructor(httpClient: AxiosInstance, debug: boolean) {
    this.debug = debug;
    this.httpClient = httpClient;

    //TODO add unserialize expirations dates and id token from localStorage.
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

  getAuthorizeUrl(): string {
    return `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.authorize}?response_type=code&client_id=${this.appId}&redirect_uri=${this.redirectUri}&scope=${this.scopes}`;
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
    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + this.OAUTH_ENDPOINTS.jwks)
    );

    const result = await jose.jwtVerify(token, JWKS, {
      issuer: this.issuer,
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
      // await this._verifyToken(response.data.access_token);
      // await this._verifyToken(response.data.refresh_token);
      const decodedAccessToken = jose.decodeJwt(response.data.access_token);
      this._accessTokenExpires = decodedAccessToken.exp!;
      OAuthService.setAccessToken(response.data.access_token);

      const decodedRefreshToken = jose.decodeJwt(response.data.access_token);
      this._refreshTokenExpires = decodedRefreshToken.exp!;
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
    setTimeout(async () => {
      await this.refreshTokens();
      this.setRefreshTokenScheduler();
    }, (this._accessTokenExpires - new Date().getUTCSeconds()) * 1000);
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
      token_type: string;
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
      // await this._verifyToken(response.data.access_token);
      // await this._verifyToken(response.data.refresh_token);
      OAuthService.setAccessToken(response.data.access_token);
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

  async currentUser() {
    // In future we can make it possible to obtain claims data from oauth's /userinfo endpoint
    // This is by specification
    // for now it reads data from the id_token if pressent
    const id_token = OAuthService.getOpenIDToken();

    if (id_token) {
      const idTokenClaim = jose.decodeJwt(id_token);
      return idTokenClaim;
    }

    return null;
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
