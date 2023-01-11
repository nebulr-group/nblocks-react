import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { AuthService } from "./AuthService";
import { ClientError } from "./errors/ClientError";
import { OAuthService } from "./OAuthService";

interface ErrorExtensions {
  code?: string;
  exception?: ClientError;
}

export class AuthApolloClient {
  readonly client: ApolloClient<NormalizedCacheObject>;
  private readonly debug: boolean;
  private readonly appId?: string; // App id should only be present when running backendless
  private unauthenticatedCallback = () => {};
  private forbiddenCallback = () => {};

  constructor(graphqlUrl: string, debug: boolean, appId?: string) {
    this.debug = debug;
    this.appId = appId;

    const cache = new InMemoryCache();

    this.client = new ApolloClient({
      cache,
      link: this._configureApolloLink(graphqlUrl),
    });
  }

  setUnauthenticatedCallback(callback: () => void): void {
    this.unauthenticatedCallback = callback;
  }

  setForbiddenCallback(callback: () => void): void {
    this.forbiddenCallback = callback;
  }

  private _configureApolloLink(graphqlUrl: string): ApolloLink {
    const debug = this.debug;
    const appId = this.appId;

    const httpLink = createHttpLink({
      uri: graphqlUrl,
    });

    const authLink = setContext(async (_, { headers }) => {
      const [authToken, mfaToken, tenantUserId, oAuthToken] = [
        AuthService.getAuthToken(),
        AuthService.getMfaToken(),
        AuthService.getTenantUserId(),
        OAuthService.getAccessToken(),
      ];

      if (oAuthToken) {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${oAuthToken}`,
          },
        };
      }

      return {
        headers: {
          ...headers,
          "x-auth-token": authToken
            ? mfaToken
              ? `${authToken}_${mfaToken}`
              : authToken
            : "",
          "x-tenant-user-id": tenantUserId ? tenantUserId : "",
          "x-app-id": appId ? appId : "",
        },
      };
    });

    const requestMiddleware = new ApolloLink((operation, forward) => {
      if (debug)
        console.log(
          "[GraphQL request]:",
          operation.operationName,
          operation.variables
        );
      return forward(operation);
    });

    const responseLink = new ApolloLink((operation, forward) => {
      return forward(operation).map((response) => {
        if (debug) {
          console.log("[GraphQL response]:", response);
        }
        return response;
      });
    });

    const errorLink = onError(
      ({ graphQLErrors, networkError, response, operation }) => {
        if (graphQLErrors) {
          for (const error of graphQLErrors) {
            console.error(
              `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
            );

            const extension = error?.extensions as ErrorExtensions;
            if (extension) {
              switch (extension.exception?.httpStatus) {
                case 401:
                  this.unauthenticatedCallback();
                  break;

                case 403:
                  this.forbiddenCallback();
                  break;

                default:
                  console.error("Unhandled GraphQL exception", error);
                  break;
              }
            }
          }
        }
        if (networkError) {
          console.error(
            `[Network error]: ${networkError}`,
            operation,
            response
          );
        }
      }
    );

    return from([
      authLink,
      requestMiddleware,
      errorLink,
      responseLink,
      httpLink,
    ]);
  }
}
