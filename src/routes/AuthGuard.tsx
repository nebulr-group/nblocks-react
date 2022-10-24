import React from "react";
import {
  Navigate, useLocation,
} from "react-router-dom";
import { useApp } from "../hooks/app-context";
import { useAuth } from "../hooks/auth-context";

function AuthGuard({ children }: { children: JSX.Element }) {
  const {currentUser} = useAuth();
  const {debug} = useApp();
  let location = useLocation();

  if (!currentUser.authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (debug) {
      console.log("Authguard redirecting user to login");
    }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthGuard };
