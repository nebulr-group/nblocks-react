import { useSecureContext } from "../../hooks/secure-http-context";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function LoginScreen() {

  const {authService} = useSecureContext();
  const [loggedIn, setLoggedIn] = useState(false);
  
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
      return (<Navigate to="/auth/chooseWorkspace"/>)
}