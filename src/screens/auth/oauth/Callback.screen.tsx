import React, { FunctionComponent, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { useConfig } from "../../../hooks/config-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";

const CallbackScreen: FunctionComponent<{}> = () => {
  const location = useLocation();
  const { handoverRoute } = useConfig();
  const { switchUser } = useAuth();
  const { didAuthenticate, authService, authenticated } = useSecureContext();
  const { t } = useTranslation();

  const urlSearch = new URLSearchParams(location.search);
  const code = urlSearch.get("code");
  const error = urlSearch.get("error");
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

  if (error) {
    console.error("Login error");
    // return <Navigate to={authService.getLoginUrl("")} />;
  }

  if (authenticated) {
    return <Navigate to={target} />;
  } else {
    return <h1>{t("Logging in...")}</h1>;
  }
};

export { CallbackScreen };
