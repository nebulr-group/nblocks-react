import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService } from "../utils/AuthService";
import { AuthHttpClient } from "../utils/AuthHttpClient";
import { AuthApolloClient } from "../utils/AuthApolloClient";
import { ApolloProvider } from "@apollo/client";
import { useConfig } from "./config-context";

//TODO expose something simpler hook for external app developers to use
const initialSecurityContext = {
  authService: {} as AuthService,
  authHttpClient: {} as AuthHttpClient, 
  authApolloClient: {} as AuthApolloClient, 
  authenticated: false, 
  didAuthenticate: (value: boolean) => {}
};

const SecureContext = React.createContext(initialSecurityContext);
const useSecureContext = () => useContext(SecureContext);

const NblocksSecureContextProvider: FunctionComponent<{children: React.ReactNode}> = ({children}) => {

    const {apiHost, graphqlPath, debug} = useConfig();
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [authHttpClient] = useState<AuthHttpClient>(new AuthHttpClient(apiHost, debug));
    const [authService] = useState<AuthService>(new AuthService(authHttpClient.httpClient, debug));
    const [authApolloClient] = useState<AuthApolloClient>(new AuthApolloClient(`${apiHost}${graphqlPath}`, debug));

    const didAuthenticate = (value: boolean) => {
      if (debug)
        console.log(`Did authenticate: ${value}`);
      setAuthenticated(value);
    }

    useEffect(() => {
      if (!authenticated) {
        authService.checkCurrentUserAuthenticated().then(authenticated => {
          didAuthenticate(authenticated);
        });
      }
    })

    return (
      <SecureContext.Provider value={{...initialSecurityContext,...{
        authHttpClient,
        authService,
        authApolloClient,
        authenticated, 
        didAuthenticate
        }}}>
        <ApolloProvider client={authApolloClient.client}>
            {children}
        </ApolloProvider>
      </SecureContext.Provider>
    );
}

export {NblocksSecureContextProvider, useSecureContext};