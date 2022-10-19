import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { AuthService, UpdateUserProfileArgs } from "../utils/AuthService";
import { CurrentUser } from "../models/current-user.model";
import { useSecureContext } from "./secure-http-context";
import { useApp } from "./app-context";

const initialAuthContext = {
  currentUser: new CurrentUser(),
  logout: () => {},
  switchUser: (tenantUserId: string) => {},
  refreshCurrentUser: () => {}
};

const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

interface NblocksContextProps {
  children: React.ReactNode;
}

const NblocksAuthContextProvider: FunctionComponent<NblocksContextProps> = ({children}) => {
    const {debug} = useApp();
    const {authenticated, didAuthenticate, authService, authApolloClient, authHttpClient} = useSecureContext();
    const [currentUser, setCurrentUser] = useState(new CurrentUser());

    //TODO async
    const logout = () => {
      AuthService.clearAuthStorage();
      authApolloClient.client.resetStore();
      didAuthenticate(false);
      if(debug)
        console.log("DidLogout");
    }

    //TODO async
    const switchUser = (userId: string) => {
      authApolloClient.client.resetStore();
      AuthService.setTenantUserId(userId!);
      if (authenticated)
        refreshCurrentUser();
      if (debug)
        console.log("DidSwitchUser");
    }

    // Attach listners to events in http/graphql clients
    authHttpClient.setUnauthenticatedCallback(() => logout());
    authApolloClient.setUnauthenticatedCallback(() => logout());
    authHttpClient.setForbiddenCallback(() => console.error("Forbidden error!"));
    authApolloClient.setForbiddenCallback(() => console.error("Forbidden error!"));

    const refreshCurrentUser = () => {
      authService.currentUser().then(user => setCurrentUser(new CurrentUser(user)));
      if (debug)
        console.log("refreshCurrentUser");
    }

    useEffect(() => {
        if (authenticated) {
          refreshCurrentUser();
        } else {
          setCurrentUser(new CurrentUser());
        }
    }, [authenticated])

    return (
      <AuthContext.Provider value={{...initialAuthContext,...{currentUser, logout, switchUser, refreshCurrentUser}}}>
        {children}
      </AuthContext.Provider>
    );
}

export {NblocksAuthContextProvider, useAuth};