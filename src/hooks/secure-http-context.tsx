import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthService } from "../utils/AuthService";
import { AuthHttpClient } from "../utils/AuthHttpClient";
import { AuthApolloClient } from "../utils/AuthApolloClient";
import { ApolloProvider } from "@apollo/client";
import { useConfig } from "./config-context";
import { OAuthService } from "../utils/OAuthService";

const initialSecurityContext = {
  authService: {} as AuthService | OAuthService,
  authHttpClient: {} as AuthHttpClient,
  authApolloClient: {} as AuthApolloClient,
  authenticated: true, // Optimistic approach
  didAuthenticate: (value: boolean) => {},
};

const SecureContext = React.createContext(initialSecurityContext);
const useSecureContext = () => useContext(SecureContext);

const NblocksSecureContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { apiHost, graphqlPath, debug, appId, authLegacy } = useConfig();

  const [authenticated, setAuthenticated] = useState<boolean>(true); // Optimistic approach
  const [authHttpClient] = useState<AuthHttpClient>(
    new AuthHttpClient(apiHost, debug, appId)
  );
  const [authService] = useState<AuthService | OAuthService>(
    !authLegacy
      ? new OAuthService(authHttpClient.httpClient, debug)
      : new AuthService(authHttpClient.httpClient, debug)
  );
  const [authApolloClient] = useState<AuthApolloClient>(
    new AuthApolloClient(`${apiHost}${graphqlPath}`, debug, appId)
  );

  const didAuthenticate = (value: boolean) => {
    setAuthenticated(value);
    log(`Did authenticate: ${value}`);
  };

  useEffect(() => {
    log("Use effect entry point");
    authService.checkCurrentUserAuthenticated().then((authenticated) => {
      didAuthenticate(authenticated);
    });
  }, []);

  const log = (msg: string) => {
    if (debug) {
      console.log(`NblocksSecureContextProvider: ${msg}`);
    }
  };

  return (
    <SecureContext.Provider
      value={{
        ...initialSecurityContext,
        ...{
          authHttpClient,
          authService,
          authApolloClient,
          authenticated,
          didAuthenticate,
        },
      }}
    >
      <ApolloProvider client={authApolloClient.client}>
        {children}
      </ApolloProvider>
    </SecureContext.Provider>
  );
};

export { NblocksSecureContextProvider, useSecureContext };
