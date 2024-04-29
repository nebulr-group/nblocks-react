import { AxiosInstance } from "axios";
import { LibConfig } from "../models/lib-config";

export class PaymentsService {
  private readonly ENDPOINTS = {
    setCookie: "/security/setCookie",
    anonymousCheckoutView: "/payments/anonymousCheckoutView",
    checkoutView: "/payments/checkoutView",
    subscriptionPortal: "/payments/subscriptionPortal",
  };

  private readonly httpClient: AxiosInstance;
  private readonly debug: boolean;
  private readonly apiHost;

  constructor(httpClient: AxiosInstance, config: LibConfig) {
    this.debug = config.debug;
    this.httpClient = httpClient;
    this.apiHost = config.apiHost;
  }

  async redirectToAnonymousCheckoutViewUrl(): Promise<string> {
    await this._setSecureCookie();
    return `${this.apiHost}${this.ENDPOINTS.anonymousCheckoutView}`;
  }

  async redirectToCheckoutViewUrl(): Promise<string> {
    await this._setSecureCookie();
    return `${this.apiHost}${this.ENDPOINTS.checkoutView}`;
  }

  async redirectToSubscriptionPortalUrl(): Promise<string> {
    await this._setSecureCookie();
    return `${this.apiHost}${this.ENDPOINTS.subscriptionPortal}`;
  }

  private async _setSecureCookie(): Promise<void> {
    await this.httpClient.post(`${this.apiHost}${this.ENDPOINTS.setCookie}`, {},
      { baseURL: this.apiHost, withCredentials: true });
  }
}
