import { AxiosInstance } from "axios";
import { AuthTenantUserResponseDto } from "../models/auth-tenant-user-response.dto";
import { NblocksStorage } from "./Storage";

//FIXME centralize models
export type UpdateUserProfileArgs = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  consentsToPrivacyPolicy?: boolean;
};
export type MfaState = "DISABLED" | "REQUIRED" | "SETUP";

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

  private static AUTH_TOKEN_KEY = "AUTH_TOKEN";
  private static TENANT_USER_ID_KEY = "TENANT_USER_ID";
  private static MFA_TOKEN_KEY = "MFA_TOKEN";

  constructor(httpClient: AxiosInstance, debug: boolean) {
    this.debug = debug;
    this.httpClient = httpClient;
  }

  /**
   * Application boot should start by calling this method
   * @returns
   */
  async checkCurrentUserAuthenticated(): Promise<boolean> {
    const hasFullAuthContext = await AuthService.hasFullAuthContext();
    if (hasFullAuthContext) {
      const authenticated = await this.authenticated();
      if (authenticated) {
        return true;
      }
    }

    return false;
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<{ mfaState: MfaState }> {
    const response = await this.httpClient.post<{
      token: string;
      mfaState: MfaState;
    }>(this.ENDPOINTS.authenticate, { username, password });
    if (!response.data.token) throw new Error("Wrong credentials");

    AuthService.setAuthToken(response.data.token);

    return { mfaState: response.data.mfaState };
  }

  async authenticated(): Promise<boolean> {
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
    const result = await this.httpClient.post<{ mfaToken: string }>(
      this.ENDPOINTS.commitMfaCode,
      { mfaCode }
    );
    AuthService.setMfaToken(result.data.mfaToken);
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
    AuthService.setMfaToken(result.data.mfaToken);
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

  async currentUser(): Promise<AuthTenantUserResponseDto> {
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
