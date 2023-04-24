import { AxiosInstance } from "axios";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { LibConfig } from "../models/lib-config";
import { RouteConfig } from "../routes/AuthRoutes";
import { OAuthService } from "./OAuthService";
import { NblocksStorage } from "./Storage";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};
export type MfaState = "DISABLED" | "REQUIRED" | "SETUP";

/**
 * TODO merge this one with OauthService more elegantly. OauthService can contain core functionality but this one is master
 * This class should work like a toolbox for cloud views, like obtaining tokens etc. Maybe this plugin should make use of the TsLib frontend client???
 */
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
  getLoginUrl(returnUrl: string): string {
    return !!this._oauthService
      ? this._oauthService.getAuthorizeUrl(returnUrl)
      : RouteConfig.login.loginScreen;
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

  /**
   *
   * @param code
   * @returns
   */
  async handleCallbackCode(code: string): Promise<void> {
    if (!!this._oauthService) {
      await this._oauthService.getTokens(code);
    }
  }

  /**
   * Application boot should start by calling this method
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
    if (!!this._oauthService) {
      const token = this._oauthService.getIdToken();
      return token
        ? {
            email: token?.email!,
            id: token?.sub,
            onboarded: true,
            role: "something",
            tenant: { id: "1234", locale: "en", logo: "", name: "" },
            username: token.email!,
            fullName: token.name,
          }
        : {
            email: "",
            id: "",
            onboarded: true,
            role: "",
            tenant: { id: "1234", locale: "en", logo: "", name: "" },
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
