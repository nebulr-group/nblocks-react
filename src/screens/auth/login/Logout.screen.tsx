import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { useConfig } from "../../../hooks/config-context";
import { useSecureContext } from "../../../hooks/secure-http-context";

export function LogoutScreen() {
  const { logout } = useAuth();
  const { handoverRoute } = useConfig();
  const { authService } = useSecureContext();
  const [didLogout, setDidLogout] = useState(false);

  useEffect(() => {
    doLogout();
  }, []);

  const doLogout = async () => {
    await logout();
    setDidLogout(true);
  };

  if (didLogout)
    return (
      <Navigate
        to={authService.getLoginUrl({
          useShortHand: true,
          state: handoverRoute,
        })}
        replace={true}
      />
    );
  else return null;
}
