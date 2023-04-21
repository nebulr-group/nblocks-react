import React, { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { useConfig } from "../../../hooks/config-context";
import { useSecureContext } from "../../../hooks/secure-http-context";

const CallbackScreen: FunctionComponent<{}> = () => {
  const location = useLocation();
  const { handoverRoute } = useConfig();
  const { switchUser } = useAuth();
  const { didAuthenticate, authService, authenticated, initialized } =
    useSecureContext();

  const urlSearch = new URLSearchParams(location.search);
  const code = urlSearch.get("code");
  const state = urlSearch.get("state");
  const target = state ? state : handoverRoute;

  useEffect(() => {
    if (code) {
      handleCallback(code);
    }
  }, [code]);

  const handleCallback = async (code: string) => {
    const tenantUserId = await authService.handleCallbackCode(code);
    //await switchUser(tenantUserId!);
    didAuthenticate(true);
  };

  if (authenticated && initialized) {
    return <Navigate to={target} />;
  } else {
    return <h1>Logging in...</h1>;
  }
};

export { CallbackScreen };
