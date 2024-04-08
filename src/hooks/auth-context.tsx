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
import { OAuthService } from "../utils/OAuthService";

const initialAuthContext = {
  currentUser: new CurrentUser(),
  logout: async (skipAuthenticationBroadcast?: boolean) => {},
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
    initialized,
  } = useSecureContext();
  const [currentUser, setCurrentUser] = useState(new CurrentUser());

  // Supports logging out without using didAuthenticate from secureContext which notifies all listners
  const logout = async (skipAuthenticationBroadcast?: boolean) => {
    await authApolloClient.client.resetStore();
    if (authenticated) {
      if (!skipAuthenticationBroadcast) {
        didAuthenticate(false);
      }
      log(`Did logout`);
    } else {
      log(`User is already logged out`);
    }

    // Finish off with wiping local storage
    AuthService.clearAuthStorage();
    OAuthService.clearAuthStorage();
  };

  /**
   * TODO refresh tokens if we switch user
   * @param userId
   */
  const switchUser = async (userId: string) => {
    await authApolloClient.client.resetStore();
    AuthService.setTenantUserId(userId!);
    if (authenticated) {
      refreshCurrentUser();
    }
    log(`Did switch user to: ${userId}`);
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

  const log = (msg: string) => {
    if (debug) {
      console.log(`NblocksAuthContextProvider: ${msg}`);
    }
  };

  const refreshCurrentUser = async () => {
    log("Will refresh currentUser");
    const user = await authService.currentUser();
    setCurrentUser(new CurrentUser(user));
    log("Did refresh currentUser");
  };

  useEffect(() => {
    if (authenticated && initialized) {
      refreshCurrentUser();
    } else {
      setCurrentUser(new CurrentUser());
    }
  }, [authenticated, initialized]);

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
