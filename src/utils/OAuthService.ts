import { AxiosInstance } from "axios";
import { NblocksStorage } from "./Storage";
import * as jose from "jose";
import { GetKeyFunction } from "jose/dist/types/types";
import { LibConfig } from "../models/lib-config";
import { FederationType, MfaState } from "./AuthService";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON, PublicKeyCredentialRequestOptionsJSON, AuthenticationResponseJSON } from '@simplewebauthn/typescript-types'
import { doLog } from "../hooks/use-log";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};

export type FederationConnectionType = 'saml' | 'oidc';
export interface FederationConnection { id: string, type: FederationConnectionType, name: string }
export interface CredentialsConfig { hasPassword: boolean, hasPasskeys: boolean, federationConnections: FederationConnection[] }

export type OpenIDClaims = {
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

export type AccessTokenClaims = {
  scope: string;
  role: string;
  trial: boolean;
  aid: string;
  tid: string;
  iat: number;
  exp: number;
  aud: string[];
  iss: string;
  sub: string;
};

// TODO this class should probably just take care of OAuth specific stuff.
// The calls that are made to auth-api regarding authenticate/mfa should be made through AuthService for a cleaner code base
export class OAuthService {
  private readonly OAUTH_ENDPOINTS = {
    authorize: "/authorize",
    authorizeShorthand: "/url/login",
    logoutShorthand: "/url/logout",
    token: "/token",
    tokenCodeShorthand: "/token/code",
    refresh: "/token",
    jwks: "/.well-known/jwks.json",
  };

  private readonly AUTH_API_ENDPOINTS = {
    federatedLogin: "/federated",
    authenticate: "/auth/authenticate",
    credentialsConfig: "/auth/credentialsConfig",
    tenantUsers: "/auth/tenantUsers",
    handover: "/auth/chooseTenantUser",
    logout: "/auth/logout",
    commitMfaCode: "/auth/commitMfaCode",
    startMfaUserSetup: "/auth/startMfaUserSetup",
    finishMfaUserSetup: "/auth/finishMfaUserSetup",
    resetUserMfaSetup: "/auth/resetUserMfaSetup",
    passkeysRegistrationOptions: "/auth/passkeys/registration-options",
    passkeysVerifyRegistration: "/auth/passkeys/verify-registration",
    passkeysAuthenticationOptions: "/auth/passkeys/authentication-options",
    passkeysVerifyAuthentication: "/auth/passkeys/verify-authentication",
  };

  private _accessTokenExpires?: number;
  private _refreshTokenExpires?: number;
  private _idTokenClaims?: OpenIDClaims;
  private _accessTokenClaims?: AccessTokenClaims;
  private _initializePromise: Promise<void>;

  private readonly _JWKS: GetKeyFunction<
    jose.JWSHeaderParameters,
    jose.FlattenedJWSInput
  >;

  // This is set from libConfig
  private readonly EXPECTED_ISSUER: string;
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
    this.EXPECTED_ISSUER = config.oAuthBaseURI;
    this.redirectUri = config.oauthRedirectUri;

    const JWKS = jose.createRemoteJWKSet(
      new URL(this.oAuthBaseURI + this.OAUTH_ENDPOINTS.jwks)
    );
    this._JWKS = JWKS;

    this._initializePromise = this.restoreTokensFromLocalStorage();
  }

  log(msg: string): void {
    if (this.debug) {
      doLog(`OAuthService: ${msg}`);
    }
  }

  getFederatedLoginUrl(type: FederationType, connectionId?: string): string {
    switch (type) {
      case 'saml':
      case 'oidc':
        return `${this.oAuthBaseURI}${this.AUTH_API_ENDPOINTS.federatedLogin}/${type}/login/${connectionId}`;

      default:
        return `${this.oAuthBaseURI}${this.AUTH_API_ENDPOINTS.federatedLogin}/${type}/login`;
    }
  }

  getFederatedSignupUrl(type: FederationType): string {
    return `${this.oAuthBaseURI}${this.AUTH_API_ENDPOINTS.federatedLogin}/${type}/signup`;
  }

  private async restoreTokensFromLocalStorage(): Promise<void> {
    try {
      const [openIdToken, accessToken, refreshToken] = [
        OAuthService._getIDToken(),
        OAuthService.getAccessToken(),
        OAuthService._getRefreshToken(),
      ];

      try {
        if (refreshToken) {
          const decoded = await this._verifyToken(refreshToken);
          this._refreshTokenExpires = decoded.payload.exp;
        }

        if (openIdToken) {
          const decoded = await this._verifyToken(openIdToken);
          this._setIDTokenClaims(decoded.payload as OpenIDClaims);
        }

        if (accessToken) {
          const decoded = await this._verifyToken(accessToken);
          this._setAccessTokenClaims(decoded.payload as AccessTokenClaims);
          this._accessTokenExpires = decoded.payload.exp;
        }
      } catch (error) {
        if (this.debug) {
          console.error(`OAuthService: Encountered error when restoring tokens from localStorage`, error);
        }

        if (this._refreshTokenExpires) {
          // We have a valid refresh token, so let's try to refresh the access and ID token.
          if (this.debug) {
            doLog(`OAuthService: Recovering from error by Refreshing tokens since refreshToken exists`);
          }
          await this.refreshTokens();
        } else {
          doLog(`OAuthService: No refreshToken exists. Waiting for observers to understand the user is unauthenticated`);
          return;
        }
      } finally {
        if ((!this._accessTokenExpires || !this._idTokenClaims) && this._refreshTokenExpires) {
          // We have a valid refresh token, so let's try to refresh the access and ID token.
          if (this.debug) {
            doLog(`OAuthService: Some tokens could not be restored. Refreshing tokens since refreshToken exists`);
          }
          await this.refreshTokens();
        }
      }

      if (this.debug) {
        doLog(`OAuthService: Did try to restore tokens from Local storage and successfully restored [${this._refreshTokenExpires ? 'refreshToken' : ''} ${this._accessTokenExpires ? 'accessToken' : ''} ${this._idTokenClaims ? 'idToken' : ''}]`);
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

  getAuthorizeUrl(args: { useShortHand?: boolean, state?: string }): string {
    const { useShortHand, state } = args;
    const url = useShortHand ? `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.authorizeShorthand}/${this.appId}${state ? `?state=${state}` : ""}` : `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.authorize}?response_type=code&client_id=${this.appId}&redirect_uri=${this.redirectUri}&scope=${this.OAUTH_SCOPES}${state ? `&state=${state}` : ""}`;

    return url;
  }

  getLogoutUrl(): string {
    return `${this.oAuthBaseURI}${this.OAUTH_ENDPOINTS.logoutShorthand}/${this.appId}`;
  }

  getHandoverUrl(tenantUserId?: string): string {
    return `${this.oAuthBaseURI}${this.AUTH_API_ENDPOINTS.handover}/${tenantUserId}`;
  }

  getIdTokenClaims(): OpenIDClaims | undefined {
    return this._idTokenClaims;
  }

  getAccessTokenClaims(): AccessTokenClaims | undefined {
    return this._accessTokenClaims;
  }

  async getCredentialsConfig(
    username: string
  ): Promise<CredentialsConfig> {
    const response = await this.httpClient.post<CredentialsConfig>(
      this.AUTH_API_ENDPOINTS.credentialsConfig,
      {
        username,
      },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );

    return response.data;
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

  async getPasskeysRegistrationOptions(forgotPasswordToken: string): Promise<PublicKeyCredentialCreationOptionsJSON> {
    const result = await this.httpClient.get<PublicKeyCredentialCreationOptionsJSON>(
      `${this.AUTH_API_ENDPOINTS.passkeysRegistrationOptions}?forgotPasswordToken=${forgotPasswordToken}`,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return result.data;
  }

  async passkeysVerifyRegistration(args: RegistrationResponseJSON, forgotPasswordToken: string): Promise<{ verified: boolean }> {
    const result = await this.httpClient.post<{ verified: boolean }>(
      `${this.AUTH_API_ENDPOINTS.passkeysVerifyRegistration}?forgotPasswordToken=${forgotPasswordToken}`, args,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return result.data;
  }

  async getPasskeysAuthenticationOptions(): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const result = await this.httpClient.get<PublicKeyCredentialRequestOptionsJSON>(
      this.AUTH_API_ENDPOINTS.passkeysAuthenticationOptions,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return result.data;
  }

  async passkeysVerifyAuthentication(args: AuthenticationResponseJSON): Promise<{ mfaState: MfaState; tenantUserId?: string }> {
    const response = await this.httpClient.post<{
      session: string;
      expiresIn: number;
      mfaState: MfaState;
      tenantUserId?: string;
    }>(
      this.AUTH_API_ENDPOINTS.passkeysVerifyAuthentication, args,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );

    const { session, mfaState, tenantUserId } = response.data;

    if (!session) {
      throw new Error("Wrong credentials");
    }

    return { mfaState, tenantUserId };
  }

  async commitMfaCode(mfaCode: string): Promise<void> {
    await this.httpClient.post<void>(
      this.AUTH_API_ENDPOINTS.commitMfaCode,
      { mfaCode },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
  }

  async startMfaUserSetup(phoneNumber: string): Promise<void> {
    await this.httpClient.post<void>(
      this.AUTH_API_ENDPOINTS.startMfaUserSetup,
      {
        phoneNumber,
      },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
  }

  async finishMfaUserSetup(mfaCode: string): Promise<string> {
    const result = await this.httpClient.post<{
      backupCode: string;
    }>(
      this.AUTH_API_ENDPOINTS.finishMfaUserSetup,
      { mfaCode },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return result.data.backupCode;
  }

  async resetUserMfaSetup(backupCode: string): Promise<void> {
    await this.httpClient.post(
      this.AUTH_API_ENDPOINTS.resetUserMfaSetup,
      {
        backupCode,
      },
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
  }

  async listUsers(): Promise<AuthTenantUserResponseDto[]> {
    const response = await this.httpClient.get<AuthTenantUserResponseDto[]>(
      this.AUTH_API_ENDPOINTS.tenantUsers,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
    return response.data;
  }

  /** Logout via Auth API, this also removes current OAuth ctx */
  /** User should initiate a new Oauth login flow after */
  async logout(): Promise<void> {
    await this.httpClient.get<void>(
      this.AUTH_API_ENDPOINTS.logout,
      { baseURL: this.oAuthBaseURI, withCredentials: true }
    );
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

  /**
   *
   * @param code 
   * @param useShortHand used by cloud views when redirectUri is default
   * @returns 
   */
  async getTokensFromCode(code: string, useShortHand?: boolean): Promise<boolean> {
    const response = useShortHand ? await this.httpClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
      expiresIn: number;
      id_token?: string;
    }>(
      `${this.OAUTH_ENDPOINTS.tokenCodeShorthand}/${this.appId}`,
      {
        code,
      },
      { baseURL: this.oAuthBaseURI }
    ) : await this.httpClient.post<{
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
      this._setAccessTokenClaims(decodedAccessToken.payload as AccessTokenClaims);
      this._accessTokenExpires = decodedAccessToken.payload.exp!;
      OAuthService._setAccessToken(response.data.access_token);

      const decodedRefreshToken = await this._verifyToken(
        response.data.refresh_token
      );
      this._refreshTokenExpires = decodedRefreshToken.payload.exp!;
      OAuthService._setRefreshToken(response.data.refresh_token);

      if (response.data.id_token) {
        const idTokenVerify = await this._verifyToken(response.data.id_token);
        this._setIDTokenClaims(idTokenVerify.payload as OpenIDClaims);
        OAuthService._setIDToken(response.data.id_token);
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
      this.log(`OAuthService: Will schedule refresher`);
      this.log(
        `AccessToken expires in ${expiresInMs / 1000
        } seconds. Therefore we refresh it after ${threshold / 1000} seconds`
      );
      const timer = setTimeout(async () => {
        await this.refreshTokens();
        this.setRefreshTokenScheduler();
      }, threshold);
    } else {
      if (this.debug) {
        doLog(`OAuthService: Will not schedule refresher since there's no accessToken`);
      }
    }
  }

  private async _authenticated(): Promise<boolean> {
    // User is authenticated if the application has obtained id_token
    await this._initializePromise;
    const open_id = this._idTokenClaims;

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
        refresh_token: OAuthService._getRefreshToken(),
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
      this._setAccessTokenClaims(decodedAccessToken.payload as AccessTokenClaims);
      OAuthService._setAccessToken(response.data.access_token);

      const decodedRefreshToken = await this._verifyToken(
        response.data.refresh_token
      );
      this._refreshTokenExpires = decodedRefreshToken.payload.exp!;
      OAuthService._setRefreshToken(response.data.refresh_token);

      if (response.data.id_token) {
        const idTokenVerify = await this._verifyToken(response.data.id_token);
        this._setIDTokenClaims(idTokenVerify.payload as OpenIDClaims)
        OAuthService._setIDToken(response.data.id_token);
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Token Refresh failed!");
    }
  }

  static async hasFullAuthContext(): Promise<boolean> {
    return !!this._getRefreshToken(); //!!this.getAccessToken() && !!this.getIDToken();
  }

  // Setters
  _setAccessTokenClaims(claims: AccessTokenClaims): void {
    this._accessTokenClaims = claims;
  }

  static _setAccessToken(token: string): void {
    NblocksStorage.setItem(this.ACCCESS_TOKEN, token);
  }

  _setIDTokenClaims(claims: OpenIDClaims): void {
    this._idTokenClaims = claims;
  }

  static _setIDToken(token: string): void {
    NblocksStorage.setItem(this.ID_TOKEN, token);
  }

  static _setRefreshToken(token: string): void {
    NblocksStorage.setItem(this.REFRESH_TOKEN, token);
  }

  // Getters
  static _getRefreshToken(): string | null {
    return NblocksStorage.getItem(this.REFRESH_TOKEN);
  }

  static getAccessToken(): string | null {
    return NblocksStorage.getItem(this.ACCCESS_TOKEN);
  }

  static _getIDToken(): string | null {
    return NblocksStorage.getItem(this.ID_TOKEN);
  }

  static clearAuthStorage(): void {
    NblocksStorage.removeItem(this.ACCCESS_TOKEN);
    NblocksStorage.removeItem(this.ID_TOKEN);
    NblocksStorage.removeItem(this.REFRESH_TOKEN);
  }
}
