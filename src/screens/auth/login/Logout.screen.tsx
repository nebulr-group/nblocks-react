import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/auth-context";
import { useSecureContext } from "../../../hooks/secure-http-context";

export function LogoutScreen() {
  const { logout } = useAuth();
  const { authService } = useSecureContext();

  useEffect(() => {
    doLogout();
  }, []);

  const doLogout = async () => {
    await logout(true);
    window.location.replace(authService.getLogoutUrl());
  };

  return null;
}
