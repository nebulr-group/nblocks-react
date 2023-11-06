import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { FederationType, MfaState } from "../../../utils/AuthService";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const { t } = useTranslation();

  document.title = t("Login");

  const { authService } = useSecureContext();
  const { debug, handoverRoute, authLegacy } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || handoverRoute;

  const urlSearch = new URLSearchParams(location.search);
  const initalError = !!urlSearch.get("error");

  useEffect(() => {
    if (currentUser.authenticated) {
      logout();
    }
  }, [currentUser]);

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
          window.location.replace(authService.getHandoverUrl(tenantUserId)!);
        } else {
          log("Navigating to Choose user screen");
          navigate(RouteConfig.login.chooseUserScreen);
        }

        break;
    }
  };

  const onDidClickFederatedLogin = (type: FederationType) => {
    const url = authService.getFederatedLoginUrl(type);
    window.location.href = url!;
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={t("Log in to your account")}
      subHeading={t("Welcome back! Please enter your details.")}
    >
      <LoginComponent
        initalError={initalError}
        didLogin={(mfa, tenantUserId) => onDidLogin(mfa, tenantUserId)}
        didClickFederatedLogin={(type) => onDidClickFederatedLogin(type)}
      />
    </AuthLayoutWrapperComponent>
  );
}
