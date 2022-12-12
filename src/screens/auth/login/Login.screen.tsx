import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { MfaState } from "../../../utils/AuthService";

export function LoginScreen() {
  document.title = "Login";

  const { debug, handoverRoute } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || handoverRoute;

  useEffect(() => {
    if (currentUser.authenticated) {
      logout();
    }
  }, [currentUser]);

  // Callback when the LoginComponent completed login
  const onDidLogin = (mfa: MfaState) => {
    switch (mfa) {
      case "REQUIRED":
        log("Navigating to Require MFA screen");
        navigate(RouteConfig.mfa.RequireMfaScreen);
        break;

      case "SETUP":
        log("Navigating to Setup MFA screen");
        navigate(RouteConfig.mfa.SetupMfaScreen);
        break;

      case "DISABLED":
      default:
        log("Navigating to Choose user screen");
        navigate(RouteConfig.login.ChooseUserScreen);
        break;
    }
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Log in to your account"}
      subHeading={"Welcome back! Please enter your details."}
    >
      <LoginComponent didLogin={(mfa) => onDidLogin(mfa)} />
    </AuthLayoutWrapperComponent>
  );
}
