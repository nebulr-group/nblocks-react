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
  private readonly ENDPOINTS = {
    authorize: "/authorize",
    token: "/oauth/token",
    refresh: "/oauth/refresh",
    password: "/auth-proxy/password",
    user: "/auth-proxy/user",
    tenantUsers: "/auth-proxy/tenantUsers",
    startMfaUserSetup: "/auth-proxy/startMfaUserSetup",
    commitMfaCode: "/auth-proxy/commitMfaCode",
    finishMfaUserSetup: "/auth-proxy/finishMfaUserSetup",
    resetUserMfaSetup: "/auth-proxy/resetUserMfaSetup",
  };

  private readonly oAuthBaseURI = "http://localhost:3070";

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;

  private static AUTHORIZATION_CODE = "AUTH_CODE";
  private static AUTHORIZATION_TOKEN = "AUTH_TOKEN";
  private static OPENID_TOKEN = "OPENID_TOKEN";
  private static MFA_TOKEN_KEY = "MFA_TOKEN";
  private static REFRESH_TOKEN = "REFRESH_TOKEN";

  constructor(httpClient: AxiosInstance, debug: boolean) {
    this.debug = debug;
    this.httpClient = httpClient;
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
      this.ENDPOINTS.authorize,
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

    // Check validity of the JWTs received
    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + "/.well-known/jwks.json")
    );

    const { payload: openIdClaim } = await jose.jwtVerify(
      response.data.id_token,
      JWKS,
      { issuer: this.oAuthBaseURI, audience: [client_id] }
    );

    const oAuthCodeVerify = await jose.jwtVerify(response.data.code, JWKS, {
      issuer: this.oAuthBaseURI,
      audience: [client_id],
    });

    OAuthService.setOAuthCode(response.data.code);
    OAuthService.setOpenIDToken(response.data.id_token);
    // OAuthService.setTenantUserId(openIdClaim.tid as string);
    return true;
  }

  async authorizeClient(client_id: string, grant_type: string, code: string) {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>(
      this.ENDPOINTS.token,
      {
        client_id,
        grant_type,
        code: OAuthService.getOAuthCode(),
      },
      { baseURL: this.oAuthBaseURI }
    );

    if (!response.data.access_token && !response.data.refresh_token!) {
      throw new Error("Wrong credentials!");
    }

    // Check validity of the JWTs received
    // Check validity of the JWTs received
    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + "/.well-known/jwks.json")
    );

    try {
      const oAuthTokenVerify = await jose.jwtVerify(
        response.data.access_token,
        JWKS,
        { issuer: this.oAuthBaseURI, audience: [client_id] }
      );

      const refreshTokenVerify = await jose.jwtVerify(
        response.data.refresh_token,
        JWKS,
        {
          issuer: this.oAuthBaseURI,
          audience: [client_id],
        }
      );
    } catch (error) {
      throw new Error("Authentication failed!");
    }

    OAuthService.setOAuthToken(response.data.access_token);
    OAuthService.setRefreshToken(response.data.refresh_token);
    return true;
  }

  async authenticated(): Promise<boolean> {
    // User is authenticated if the application has obtained id_token
    const open_id = OAuthService.getOpenIDToken();

    if (!open_id) {
      return false;
    }
    return true;
  }

  async refreshTokens(client_id: string): Promise<boolean> {
    const response = await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>(
      this.ENDPOINTS.refresh,
      {
        client_id,
        grant_type: "refresh_token",
        refresh_token: OAuthService.getRefreshToken(),
      },
      { baseURL: this.oAuthBaseURI }
    );

    if (!response.data.access_token && !response.data.refresh_token!) {
      throw new Error("Wrong credentials!");
    }

    // Check validity of the JWTs received
    // Check validity of the JWTs received
    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + "/.well-known/jwks.json")
    );

    try {
      const oAuthTokenVerify = await jose.jwtVerify(
        response.data.access_token,
        JWKS,
        { issuer: this.oAuthBaseURI, audience: [client_id] }
      );

      const refreshTokenVerify = await jose.jwtVerify(
        response.data.refresh_token,
        JWKS,
        {
          issuer: this.oAuthBaseURI,
          audience: [client_id],
        }
      );
    } catch (error) {
      throw new Error("Authentication failed!");
    }

    OAuthService.setOAuthToken(response.data.access_token);
    OAuthService.setRefreshToken(response.data.refresh_token);
    return true;
  }

  async sendResetPasswordLink(username: string): Promise<void> {
    await this.httpClient.post<void>(this.ENDPOINTS.password, { username });
  }

  async updatePassword(token: string, password: string): Promise<void> {
    await this.httpClient.put(this.ENDPOINTS.password, { token, password });
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
    return !!this.getOAuthToken() && !!this.getOpenIDToken();
  }
  // Setters

  static setOAuthToken(token: string): void {
    NblocksStorage.setItem(this.AUTHORIZATION_TOKEN, token);
  }

  static setOAuthCode(token: string): void {
    NblocksStorage.setItem(this.AUTHORIZATION_CODE, token);
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

  static getOAuthToken(): string | null {
    return NblocksStorage.getItem(this.AUTHORIZATION_TOKEN);
  }

  static getOAuthCode(): string | null {
    return NblocksStorage.getItem(this.AUTHORIZATION_CODE);
  }

  static getOpenIDToken(): string | null {
    return NblocksStorage.getItem(this.OPENID_TOKEN);
  }

  // static getTenantUserId(): string | null {
  //   return NblocksStorage.getItem(this.TENANT_USER_ID_KEY);
  // }

  static clearOAuthStorage(): void {
    NblocksStorage.removeItem(this.AUTHORIZATION_CODE);
    NblocksStorage.removeItem(this.AUTHORIZATION_TOKEN);
    NblocksStorage.removeItem(this.OPENID_TOKEN);
  }
}
