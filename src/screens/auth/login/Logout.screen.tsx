import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/auth-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { useRedirect } from "../../../hooks/use-redirect";

export function LogoutScreen() {
  const { logout } = useAuth();
  const { authService } = useSecureContext();
  const { replace } = useRedirect();

  useEffect(() => {
    doLogout();
  }, []);

  const doLogout = async () => {
    await logout(true);
    replace(authService.getLogoutUrl());
  };

  return null;
}
