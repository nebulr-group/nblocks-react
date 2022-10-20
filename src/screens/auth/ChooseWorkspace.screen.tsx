import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/app-context";
import { useAuth } from "../../hooks/auth-context";
import { useSecureContext } from "../../hooks/secure-http-context";

export function ChooseWorkspaceScreen() {

  document.title = "Choose workspace";

  const {debug} = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const {switchUser } = useAuth();
  const {authService, didAuthenticate} = useSecureContext();

  // Handover will be done to / or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || "/";
  
  const selectUser = async () => {
    const myIdentities = await authService.listUsers();
    switchUser(myIdentities[0].id);
    didAuthenticate(true);
    if (debug) {
      console.log(`User did authenticate. Redirecting back to: ${targetUrl}`);
    }
    navigate(targetUrl);
  }

  return (
    <>
        {/* <ChooseWorkspaceComponent didSelectWorkspace={} /> */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => selectUser()}>Select user</button>
        </div>
    </>
  )
}