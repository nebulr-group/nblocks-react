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
  const { currentUser } = useAuth();

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || handoverRoute;

  // Watch current user. If we got here premature make sure to redirect user back to where it came from
  useEffect(() => {
    if (currentUser.authenticated) {
      if (debug) {
        console.log(
          `User was already authenticated. Redirecting back to: ${targetUrl}`
        );
      }
      navigate(targetUrl);
    }
  }, [currentUser]);

  // Callback when the LoginComponent completed login
  const onDidLogin = (mfa: MfaState) => {
    switch (mfa) {
      case "REQUIRED":
        navigate(RouteConfig.mfa.RequireMfaScreen);
        break;

      case "SETUP":
        navigate(RouteConfig.mfa.SetupMfaScreen);
        break;

      case "DISABLED":
      default:
        navigate(RouteConfig.login.ChooseUserScreen);
        break;
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
