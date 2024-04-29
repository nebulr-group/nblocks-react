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
import { useLog } from "./use-log";

const initialSecurityContext = {
  authService: {} as AuthService,
  authHttpClient: {} as AuthHttpClient,
  authApolloClient: {} as AuthApolloClient,
  authenticated: true, // Optimistic approach
  didAuthenticate: (value: boolean) => {},
  initialized: false,
};

const SecureContext = React.createContext(initialSecurityContext);
const useSecureContext = () => useContext(SecureContext);

const NblocksSecureContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const config = useConfig();
  const { apiHost, graphqlPath, debug, appId } = config;
  const { log } = useLog();

  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const [authHttpClient] = useState<AuthHttpClient>(
    new AuthHttpClient(apiHost, debug, appId)
  );
  const [authService] = useState<AuthService>(
    new AuthService(authHttpClient.httpClient, config)
  );
  const [authApolloClient] = useState<AuthApolloClient>(
    new AuthApolloClient(`${apiHost}${graphqlPath}`, debug, appId)
  );

  const didAuthenticate = (value: boolean) => {
    if (value !== authenticated) {
      setAuthenticated(value);
      log(`Did authenticate: ${value}`);
    }
  };

  useEffect(() => {
    log("Secure context entry");
    authService.checkCurrentUserAuthenticated().then((value) => {
      didAuthenticate(value);

      if (!initialized) {
        setInitialized(true);
        log(
          `Initialized. With authenticated:${value} Will render all children`
        );
      }
    });
  }, []);

  const renderChildren = () => {
    if (initialized) {
      return (
        <ApolloProvider client={authApolloClient.client}>
          {children}
        </ApolloProvider>
      );
    } else {
      return "";
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
          initialized,
        },
      }}
    >
      {renderChildren()}
    </SecureContext.Provider>
  );
};

export { NblocksSecureContextProvider, useSecureContext };
