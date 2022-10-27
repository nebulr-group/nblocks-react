import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";

export function LoginScreen() {
  document.title = "Login";

  const { debug, handoverRoute } = useConfig();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

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
  const onDidLogin = () => {
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <AuthLayoutWrapperComponent
        heading={"Log in to your account"}
        subHeading={"Welcome back! Please enter your details."}
      >
        <LoginComponent didLogin={() => onDidLogin()} />
      </AuthLayoutWrapperComponent>
    );
  } else {
    return (
      <Navigate to={RouteConfig.login.ChooseUserScreen} state={targetUrl} />
    );
  }
}
