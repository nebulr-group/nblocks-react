import { AxiosInstance } from "axios";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { LibConfig } from "../models/lib-config";
import { RouteConfig } from "../routes/AuthRoutes";
import { CredentialsConfig, OAuthService } from "./OAuthService";
import { NblocksStorage } from "./Storage";
import { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON } from "@simplewebauthn/typescript-types";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};

export type MfaState = "DISABLED" | "REQUIRED" | "SETUP";
export type FederationType = "ms-azure-ad" | "google" | "linkedin" | "saml" | "oidc";

export class AuthService {
  private readonly ENDPOINTS = {
    authenticate: "/auth-proxy/authenticate",
    authenticated: "/auth-proxy/authenticated",
    tenantUsers: "/auth-proxy/tenantUsers",
    currentUser: "/auth/currentUser",
    password: "/auth-proxy/password",
    user: "/auth-proxy/user",
    socialLogin: "/social-login",
    commitMfaCode: "/auth-proxy/commitMfaCode",
    startMfaUserSetup: "/auth-proxy/startMfaUserSetup",
    finishMfaUserSetup: "/auth-proxy/finishMfaUserSetup",
    resetUserMfaSetup: "/auth-proxy/resetUserMfaSetup",
  };

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;
  private readonly _oauthService?: OAuthService;

  private static AUTH_TOKEN_KEY = "AUTH_TOKEN";
  private static TENANT_USER_ID_KEY = "TENANT_USER_ID";
  private static MFA_TOKEN_KEY = "MFA_TOKEN";

  constructor(httpClient: AxiosInstance, config: LibConfig) {
    this.debug = config.debug;
    this.httpClient = httpClient;
    if (!config.authLegacy) {
      this._oauthService = new OAuthService(httpClient, config);
    }
  }

  /**
   * Returns either the
   * @param returnUrl
   * @returns
   */
  getLoginUrl(args?: { useShortHand?: boolean, state?: string }): string {
    return !!this._oauthService
      ? this._oauthService.getAuthorizeUrl(args ? args : {})
      : RouteConfig.login.loginScreen;
  }

  /**
   * Returns either the
   * @param returnUrl
   * @returns
   */
  getLogoutUrl(): string {
    return !!this._oauthService
      ? this._oauthService.getLogoutUrl()
      : RouteConfig.login.logoutScreen;
  }

  /**
   * FIXME, this shouldnt be here
   * @param tenantUserId
   * @returns
   */
  getHandoverUrl(tenantUserId?: string): string | undefined {
    if (!!this._oauthService) {
      return this._oauthService.getHandoverUrl(tenantUserId);
    }
  }

  getFederatedLoginUrl(type: FederationType, connectionId?: string): string | undefined {
    if (!!this._oauthService) {
      return this._oauthService.getFederatedLoginUrl(type, connectionId);
    }
  }

  getFederatedSignupUrl(type: FederationType): string | undefined {
    if (!!this._oauthService) {
      return this._oauthService.getFederatedSignupUrl(type);
    }
  }

  /**
   *
   * @param code
   * @returns
   */
  async handleCallbackCode(code: string, useShortHand?: boolean): Promise<void> {
    if (!!this._oauthService) {
      await this._oauthService.getTokensFromCode(code, useShortHand);
    }
  }

  /**
   * Application boot should start by calling this method and not render children before it has resolved
   * @returns
   */
  async checkCurrentUserAuthenticated(): Promise<boolean> {
    if (!!this._oauthService) {
      const data = await this._oauthService.checkCurrentUserAuthenticated();
      return data;
    } else {
      const hasFullAuthContext = await AuthService.hasFullAuthContext();
      if (hasFullAuthContext) {
        const authenticated = await this._authenticated();
        if (authenticated) {
          return true;
        }
      }
      return false;
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<{ mfaState: MfaState; tenantUserId?: string }> {
    if (!!this._oauthService) {
      const response = await this._oauthService.authenticate(
        username,
        password
      );
      return response;
    } else {
      const response = await this.httpClient.post<{
        token: string;
        mfaState: MfaState;
      }>(this.ENDPOINTS.authenticate, { username, password });

      if (!response.data.token) throw new Error("Wrong credentials");

      AuthService.setAuthToken(response.data.token);
      return { mfaState: response.data.mfaState };
    }
  }

  async passkeysRegistrationOptions(forgotPasswordToken: string): Promise<PublicKeyCredentialCreationOptionsJSON> {
    if (!!this._oauthService) {
      const response = await this._oauthService.getPasskeysRegistrationOptions(forgotPasswordToken);
      return response;
    }

    throw new Error("Passkeys are only available via Auth API")
  }

  async passkeysRegister(args: RegistrationResponseJSON, forgotPasswordToken: string): Promise<{
    verified: boolean;
  }> {
    if (!!this._oauthService) {
      const response = await this._oauthService.passkeysVerifyRegistration(args, forgotPasswordToken);
      return response;
    }

    throw new Error("Passkeys are only available via Auth API")
  }

  async passkeysAuthenticationOptions(): Promise<PublicKeyCredentialRequestOptionsJSON> {
    if (!!this._oauthService) {
      const response = await this._oauthService.getPasskeysAuthenticationOptions();
      return response;
    }

    throw new Error("Passkeys are only available via Auth API")
  }

  async passkeysAuthenticate(
    args: AuthenticationResponseJSON
  ): Promise<{ mfaState: MfaState; tenantUserId?: string }> {
    if (!!this._oauthService) {
      const response = await this._oauthService.passkeysVerifyAuthentication(args);
      return response;
    }

    throw new Error("Passkeys are only available via Auth API")
  }

  async getCredentialsConfig(
    username: string
  ): Promise<CredentialsConfig> {
    if (!!this._oauthService) {
      const response = await this._oauthService.getCredentialsConfig(
        username
      );
      return response;
    } else {
      return { hasPassword: true, hasPasskeys: false, federationConnections: [] }
    }
  }

  private async _authenticated(): Promise<boolean> {
    const response = await this.httpClient.get<{ authenticated: boolean }>(
      this.ENDPOINTS.authenticated
    );
    return response.data.authenticated;
  }

  async sendResetPasswordLink(username: string): Promise<void> {
    await this.httpClient.post<void>(this.ENDPOINTS.password, { username });
  }

  async updatePassword(token: string, password: string): Promise<void> {
    await this.httpClient.put(this.ENDPOINTS.password, { token, password });
  }

  async commitMfaCode(mfaCode: string): Promise<void> {
    if (!!this._oauthService) {
      await this._oauthService.commitMfaCode(mfaCode);
    } else {
      const result = await this.httpClient.post<{ mfaToken: string }>(
        this.ENDPOINTS.commitMfaCode,
        { mfaCode }
      );
      AuthService.setMfaToken(result.data.mfaToken);
    }
  }

  async startMfaUserSetup(phoneNumber: string): Promise<void> {
    if (!!this._oauthService) {
      await this._oauthService.startMfaUserSetup(phoneNumber);
    } else {
      await this.httpClient.post<void>(this.ENDPOINTS.startMfaUserSetup, {
        phoneNumber,
      });
    }
  }

  /**
   * Finish setting up MFA for the user and the user is hereby authenticated with MFA aswell.
   * @param mfaCode
   * @returns The backup code to be saved for future reference
   */
  async finishMfaUserSetup(mfaCode: string): Promise<string> {
    if (!!this._oauthService) {
      const result = await this._oauthService.finishMfaUserSetup(mfaCode);
      return result;
    } else {
      const result = await this.httpClient.post<{
        mfaToken: string;
        backupCode: string;
      }>(this.ENDPOINTS.finishMfaUserSetup, { mfaCode });
      AuthService.setMfaToken(result.data.mfaToken);
      return result.data.backupCode;
    }
  }

  async resetUserMfaSetup(backupCode: string): Promise<void> {
    if (!!this._oauthService) {
      await this._oauthService.resetUserMfaSetup(backupCode);
    } else {
      await this.httpClient.post(this.ENDPOINTS.resetUserMfaSetup, {
        backupCode,
      });
    }
  }

  async listUsers(): Promise<AuthTenantUserResponseDto[]> {
    if (!!this._oauthService) {
      const response = await this._oauthService.listUsers();
      return response;
    } else {
      const response = await this.httpClient.get<AuthTenantUserResponseDto[]>(
        this.ENDPOINTS.tenantUsers
      );
      return response.data;
    }
  }

  async currentUser(): Promise<AuthTenantUserResponseDto> {
    // Map to older structure
    if (!!this._oauthService) {
      const idToken = this._oauthService.getIdTokenClaims();
      const accessToken = this._oauthService.getAccessTokenClaims();
      return idToken && accessToken
        ? {
          email: idToken.email!,
          id: idToken.sub!,
          onboarded: idToken.onboarded!,
          role: accessToken.role,
          tenant: { id: idToken.tenant_id!, locale: idToken.locale!, logo: idToken.tenant_logo, name: idToken.tenant_name },
          username: idToken.email!,
          fullName: idToken.name,
        }
        : {
          email: "",
          id: "",
          onboarded: true,
          role: "",
          tenant: { id: "Dummy id", locale: "en", logo: "", name: "" },
          username: "",
          fullName: "Unknown",
        };
    } else {
      const response = await this.httpClient.get<AuthTenantUserResponseDto>(
        this.ENDPOINTS.currentUser
      );
      return response.data;
    }
  }

  async updateCurrentUser(userProfile: UpdateUserProfileArgs): Promise<any> {
    const response = await this.httpClient.put<any>(
      this.ENDPOINTS.user,
      userProfile
    );
    return response.data;
  }

  static async hasFullAuthContext(): Promise<boolean> {
    return !!this.getAuthToken() && !!this.getTenantUserId();
  }

  static setAuthToken(token: string): void {
    NblocksStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  static setMfaToken(token: string): void {
    NblocksStorage.setItem(this.MFA_TOKEN_KEY, token);
  }

  static setTenantUserId(userId: string): void {
    NblocksStorage.setItem(this.TENANT_USER_ID_KEY, userId);
  }

  static getAuthToken(): string | null {
    return NblocksStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  static getMfaToken(): string | null {
    return NblocksStorage.getItem(this.MFA_TOKEN_KEY);
  }

  static getTenantUserId(): string | null {
    return NblocksStorage.getItem(this.TENANT_USER_ID_KEY);
  }

  static clearAuthStorage(): void {
    NblocksStorage.removeItem(this.AUTH_TOKEN_KEY);
    NblocksStorage.removeItem(this.TENANT_USER_ID_KEY);
    NblocksStorage.removeItem(this.MFA_TOKEN_KEY);
  }
}
