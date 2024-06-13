import axios, { AxiosError, AxiosInstance } from "axios";
import { ForbiddenError } from "./errors/ForbiddenError";
import { UnauthenticatedError } from "./errors/UnauthenticatedError";
import { AuthService } from "./AuthService";
import { OAuthService } from "./OAuthService";
import { doLog } from "../hooks/use-log";

export class AuthHttpClient {
  readonly httpClient: AxiosInstance;

  private readonly BASE_URL: string;
  private readonly debug: boolean;
  private readonly appId?: string; // App id should only be present when running backendless

  private unauthenticatedCallback = () => {
    console.error("Encountered Forbidden error! We should really do something useful here like logging the user out or something");
  };
  private forbiddenCallback = () => {
    console.error("Encountered Forbidden error! We should really do something useful here like displaying an forbidden message or something");
  };
  private errorCallback = (error?: any) => {
    console.error("Encountered general error! We should really do something useful here like displaying a message or something", error);
  };

  constructor(baseUrl: string, debug: boolean, appId?: string) {
    this.BASE_URL = baseUrl;
    this.debug = debug;
    this.appId = appId;

    this.httpClient = axios.create({
      baseURL: this.BASE_URL,
    });
    this._configureHttpClient(this.httpClient);
  }

  setUnauthenticatedCallback(callback: () => void): void {
    this.unauthenticatedCallback = callback;
  }

  setForbiddenCallback(callback: () => void): void {
    this.forbiddenCallback = callback;
  }

  setErrorCallback(callback: (error?: any) => void): void {
    this.errorCallback = callback;
  }

  private _configureHttpClient(httpClient: AxiosInstance): void {
    const debug = this.debug;
    const appId = this.appId;

    httpClient.interceptors.request.use(async (request) => {
      const [authToken, mfaToken, tenantUserId, oAuthToken] = await Promise.all(
        [
          AuthService.getAuthToken(),
          AuthService.getMfaToken(),
          AuthService.getTenantUserId(),
          OAuthService.getAccessToken(),
        ]
      );

      if (oAuthToken !== null && authToken === null) {
        if (request.headers) {
          request.headers["Authorization"] = `Bearer ${oAuthToken}`;
        }
      }

      if (authToken !== null && oAuthToken === null) {
        if (request.headers)
          request.headers["x-auth-token"] = mfaToken
            ? `${authToken}_${mfaToken}`
            : authToken;
      }

      if (tenantUserId !== null && oAuthToken === null) {
        if (request.headers) request.headers["x-tenant-user-id"] = tenantUserId;
      }

      if (appId !== null) {
        if (request.headers) request.headers["x-app-id"] = appId;
      }

      if (debug) {
        doLog(
          `[HTTP request]: ${request.method?.toUpperCase()} ${request.baseURL
          }/${request.url}`,
          "Headers",
          JSON.stringify(request.headers)
        );
        if (request.data) {
          doLog("[HTTP Body]:", request.data);
        }
      }
      return request;
    });

    httpClient.interceptors.response.use(
      (response) => {
        if (debug) {
          doLog("[HTTP Response]:", response.status, response.data);
        }
        return response;
      },
      (error: AxiosError) => {
        if (debug) {
          doLog("Error response:");
          console.error(
            "Error response:",
            `${error.name} - Http status: ${error.response?.status}`,
            error.response?.data
          );
        }

        if (!error.response) throw error;

        let customError: Error;
        switch (error.response.status) {
          case 401:
            customError = new UnauthenticatedError(
              error.response.data as { message: string; error: string }
            );
            this.unauthenticatedCallback();
            break;

          case 403:
            customError = new ForbiddenError(
              error.response.data as { message: string; error: string }
            );
            this.forbiddenCallback();
            break;

          default:
            customError = new Error(error.response.data as string);
            this.errorCallback(customError)
            break;
        }

        throw customError;
      }
    );
  }
}
