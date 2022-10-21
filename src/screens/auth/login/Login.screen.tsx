import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import { useApp } from "../../../hooks/app-context";
import { LoginComponent } from "../../../components/auth/login/LoginComponent";

export function LoginScreen() {

  document.title = "Login";

  const {debug} = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || "/";
  
  // Watch current user. If we got here premature make sure to redirect user back to where it came from
  useEffect(() => {
    if (currentUser.authenticated) {
      if (debug) {
        console.log(`User was already authenticated. Redirecting back to: ${targetUrl}`);
      }
      navigate(targetUrl);
    }
  }, [currentUser]);

  // Callback when the LoginComponent completed login
  const onDidLogin = () => {
    setLoggedIn(true);
  }

  if (!loggedIn)
    return (
      <LoginComponent didLogin={() => onDidLogin()}/>
    )
  else
      return (<Navigate to="/auth/chooseWorkspace" state={targetUrl}/>)
}