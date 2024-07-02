import { AxiosInstance } from "axios";
import { LibConfig } from "../models/lib-config";
import { NblocksStorage } from "./Storage";

export class BackendlessService {
  private readonly ENDPOINTS = {
    setCookie: "/security/setCookie",
    handoverToApp: "/security/handoverToApp",
  };

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;
  private readonly apiHost;

  constructor(httpClient: AxiosInstance, config: LibConfig) {
    this.debug = config.debug;
    this.httpClient = httpClient;
    this.apiHost = config.apiHost;
  }

  // If we have a custom redirect uri it will be consumed and removed when generating the URL
  async handoverToAppUrl(): Promise<string> {
    await this._setSecureCookie();
    // Handle custom redirects flow
    const redirectUri = BackendlessService._consumeCustomRedirectUri();
    return `${this.apiHost}${this.ENDPOINTS.handoverToApp}${redirectUri ? `/?redirectUri=${redirectUri}` : ""}`;
  }

  private async _setSecureCookie(): Promise<void> {
    await this.httpClient.post(`${this.apiHost}${this.ENDPOINTS.setCookie}`, {},
      { baseURL: this.apiHost, withCredentials: true });
  }

  static setCustomRedirectUri(redirectUri: string) {
    NblocksStorage.setItem('CUSTOM_REDIRECT', redirectUri);
  }

  private static _consumeCustomRedirectUri() {
    const redirectUri = NblocksStorage.getItem('CUSTOM_REDIRECT');
    NblocksStorage.removeItem('CUSTOM_REDIRECT');
    return redirectUri;
  }
}
