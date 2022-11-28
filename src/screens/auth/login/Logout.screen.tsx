import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { RouteConfig } from "../../../routes/AuthRoutes";

export function LogoutScreen() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to={RouteConfig.login.LoginScreen} replace={true} />;
}
