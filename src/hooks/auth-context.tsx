import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthService } from "../utils/AuthService";
import { CurrentUser } from "../models/current-user.model";
import { useSecureContext } from "./secure-http-context";
import { useConfig } from "./config-context";

const initialAuthContext = {
  currentUser: new CurrentUser(),
  logout: async () => {},
  switchUser: async (tenantUserId: string) => {},
  refreshCurrentUser: () => {},
};

const AuthContext = React.createContext(initialAuthContext);
const useAuth = () => useContext(AuthContext);

interface NblocksContextProps {
  children: React.ReactNode;
}

const NblocksAuthContextProvider: FunctionComponent<NblocksContextProps> = ({
  children,
}) => {
  const { debug } = useConfig();
  const {
    authenticated,
    didAuthenticate,
    authService,
    authApolloClient,
    authHttpClient,
  } = useSecureContext();
  const [currentUser, setCurrentUser] = useState(new CurrentUser());

  //TODO async
  const logout = async () => {
    await AuthService.clearAuthStorage();
    await authApolloClient.client.resetStore();
    didAuthenticate(false);
    if (debug) console.log("DidLogout");
  };

  //TODO async
  const switchUser = async (userId: string) => {
    await authApolloClient.client.resetStore();
    await AuthService.setTenantUserId(userId!);
    if (authenticated) refreshCurrentUser();
    if (debug) console.log("DidSwitchUser");
  };

  // Attach listners to events in http/graphql clients
  authHttpClient.setUnauthenticatedCallback(() => logout());
  authApolloClient.setUnauthenticatedCallback(() => logout());
  authHttpClient.setForbiddenCallback(() =>
    console.error(
      "Encountered Forbidden error! We should really do something useful here like displaying an forbidden message or something"
    )
  );
  authApolloClient.setForbiddenCallback(() =>
    console.error(
      "Encountered Forbidden error! We should really do something useful here like displaying an forbidden message or something"
    )
  );

  const refreshCurrentUser = () => {
    authService
      .currentUser()
      .then((user) => setCurrentUser(new CurrentUser(user)));
    if (debug) console.log("refreshCurrentUser");
  };

  useEffect(() => {
    if (authenticated) {
      refreshCurrentUser();
    } else {
      setCurrentUser(new CurrentUser());
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        ...initialAuthContext,
        ...{ currentUser, logout, switchUser, refreshCurrentUser },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { NblocksAuthContextProvider, useAuth };
