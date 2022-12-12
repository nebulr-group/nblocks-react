import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useConfig } from "../hooks/config-context";
import { useSecureContext } from "../hooks/secure-http-context";
import { RouteConfig } from "./AuthRoutes";

/**
 * This is a route guard that checks if current user is authenticated or not.
 * If not, the user will be redirected to login screen.
 */
function NBAuthGuard({ children }: { children: React.ReactElement }) {
  const { authenticated } = useSecureContext();
  const { debug } = useConfig();
  let location = useLocation();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (debug) {
      console.log("Authguard redirecting user to login");
    }
    return (
      <Navigate
        to={RouteConfig.login.LoginScreen}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export { NBAuthGuard };
