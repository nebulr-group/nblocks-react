import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { useConfig } from "../../../hooks/config-context";
import { useSecureContext } from "../../../hooks/secure-http-context";

export function LogoutScreen() {
  const { logout } = useAuth();
  const { handoverRoute } = useConfig();
  const { authService } = useSecureContext();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Navigate to={authService.getLoginUrl(handoverRoute)} replace={true} />
  );
}
