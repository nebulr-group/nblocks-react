import { AxiosInstance } from "axios";
import { LibConfig } from "../models/lib-config";

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

  async handoverToApp(): Promise<void> {
    await this._setSecureCookie();
    window.location.href = `${this.apiHost}${this.ENDPOINTS.handoverToApp}`;
  }

  private async _setSecureCookie(): Promise<void> {
    await this.httpClient.post(`${this.apiHost}${this.ENDPOINTS.setCookie}`, {},
      { baseURL: this.apiHost, withCredentials: true });
  }
}
