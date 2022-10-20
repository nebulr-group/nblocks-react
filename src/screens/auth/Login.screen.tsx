import { useSecureContext } from "../../hooks/secure-http-context";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth-context";
import { useApp } from "../../hooks/app-context";

export function LoginScreen() {

  document.title = "Login";

  const {debug} = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const {currentUser} = useAuth();
  const {authService} = useSecureContext();
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

  const login = async () => {
    await authService.authenticate("oscar@nebulr.group", "helloworld");
    setLoggedIn(true);
  }

  if (!loggedIn)
    return (
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => login()}>Login</button>
      </div>
    )
  else
      return (<Navigate to="/auth/chooseWorkspace" state={targetUrl}/>)
}