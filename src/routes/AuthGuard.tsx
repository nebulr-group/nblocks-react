import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useConfig } from "../hooks/config-context";
import { useSecureContext } from "../hooks/secure-http-context";
import { useAuth } from "../hooks/auth-context";
import { useRedirect } from "../hooks/use-redirect";
import { useLog } from "../hooks/use-log";
/**
 * This is a route guard that checks if current user is authenticated or not.
 * If not, the user will be redirected to login screen.
 */
function NBAuthGuard({ children }: { children: React.ReactElement }) {
  const { authenticated, authService } = useSecureContext();
  const { logout } = useAuth();
  const { authLegacy } = useConfig();
  const { log } = useLog();
  let location = useLocation();
  const { replace } = useRedirect();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    log("Authguard redirecting user to login");

    logout().then(() => {
      //TODO Could be more elegant!
      const target = authService.getLoginUrl({
        useShortHand: true,
        state: location.state?.from?.pathname,
      });

      if (authLegacy) {
        return <Navigate to={target} state={{ from: location }} replace />;
      } else {
        replace(target);
      }
    });
  }

  return children;
}

export { NBAuthGuard };
