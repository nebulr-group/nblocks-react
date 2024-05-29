import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { FederationType } from "../../../utils/AuthService";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";
import { FederationConnection } from "../../../utils/OAuthService";
import { useRedirect } from "../../../hooks/use-redirect";
import { ErrorDetails } from "../../../types/error-details";
import { useLogin } from "../../../hooks/use-login";

export function LoginScreen() {
  const { t } = useTranslation();

  document.title = t("Login");

  const { authService } = useSecureContext();
  const { handoverRoute } = useConfig();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { navigate } = useRedirect();
  const { handleDidLogin } = useLogin();

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || handoverRoute;

  const urlSearch = new URLSearchParams(location.search);
  const initalError = !!urlSearch.get("error");
  const errorDetails = urlSearch.get("errorDetails") as
    | ErrorDetails
    | undefined;

  useEffect(() => {
    if (currentUser.authenticated) {
      doLogout();
    }
  }, [currentUser]);

  const doLogout = async () => {
    await logout();
  };

  const onDidClickFederatedLogin = (type: FederationType) => {
    const url = authService.getFederatedLoginUrl(type);
    navigate(url!);
  };

  const onDidClickFederationConnection = (connection: FederationConnection) => {
    const url = authService.getFederatedLoginUrl(
      connection.type,
      connection.id
    );
    navigate(url!);
  };

  return (
    <AuthLayoutWrapperComponent
      heading={t("Log in to your account")}
      subHeading={t("Welcome back! Please enter your details.")}
    >
      <LoginComponent
        initalError={initalError}
        errorDetails={errorDetails}
        didLogin={handleDidLogin}
        didClickFederatedLogin={onDidClickFederatedLogin}
        didClickFederationConnection={onDidClickFederationConnection}
      />
    </AuthLayoutWrapperComponent>
  );
}
