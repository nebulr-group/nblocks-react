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

  async redirectToAnonymousCheckoutView(): Promise<void> {
    await this._setSecureCookie();
    window.location.href = `${this.apiHost}${this.ENDPOINTS.anonymousCheckoutView}`;
  }

  async redirectToCheckoutView(): Promise<void> {
    await this._setSecureCookie();
    window.location.href = `${this.apiHost}${this.ENDPOINTS.checkoutView}`;
  }

  async redirectToSubscriptionPortal(): Promise<void> {
    await this._setSecureCookie();
    window.location.href = `${this.apiHost}${this.ENDPOINTS.subscriptionPortal}`;
  }

  private async _setSecureCookie(): Promise<void> {
    await this.httpClient.post(`${this.apiHost}${this.ENDPOINTS.setCookie}`, {},
      { baseURL: this.apiHost, withCredentials: true });
  }
}
