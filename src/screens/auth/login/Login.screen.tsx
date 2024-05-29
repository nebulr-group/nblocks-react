import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { FederationType, MfaState } from "../../../utils/AuthService";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";
import { FederationConnection } from "../../../utils/OAuthService";
import { useRedirect } from "../../../hooks/use-redirect";
import { useLog } from "../../../hooks/use-log";
import { ErrorDetails } from "../../../types/error-details";

export function LoginScreen() {
  const { t } = useTranslation();

  document.title = t("Login");

  const { authService } = useSecureContext();
  const { handoverRoute, authLegacy } = useConfig();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { navigate, replace } = useRedirect();
  const { log } = useLog();

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

  // Callback when the LoginComponent completed login
  const onDidLogin = async (mfa: MfaState, tenantUserId?: string) => {
    switch (mfa) {
      case "REQUIRED":
        log("Navigating to Require MFA screen");
        navigate(RouteConfig.mfa.requireMfaScreen);
        break;

      case "SETUP":
        log("Navigating to Setup MFA screen");
        navigate(RouteConfig.mfa.setupMfaScreen);
        break;

      case "DISABLED":
      default:
        if (!authLegacy && tenantUserId) {
          replace(authService.getHandoverUrl(tenantUserId)!);
        } else {
          log("Navigating to Choose user screen");
          navigate(RouteConfig.login.chooseUserScreen);
        }

        break;
    }
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
        didLogin={onDidLogin}
        didClickFederatedLogin={onDidClickFederatedLogin}
        didClickFederationConnection={onDidClickFederationConnection}
      />
    </AuthLayoutWrapperComponent>
  );
}
