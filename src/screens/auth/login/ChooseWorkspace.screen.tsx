import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChooseWorkspaceComponent } from "../../../components/auth/login/ChooseWorkspaceComponent";
import { useApp } from "../../../hooks/app-context";

export function ChooseWorkspaceScreen() {

  document.title = "Choose workspace";

  const {debug} = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Handover will be done to / or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || "/";
  
  const onDidSelectUser = async () => {
    if (debug) {
      console.log(`User did authenticate. Redirecting back to: ${targetUrl}`);
    }
    navigate(targetUrl);
  }

  return (
    <ChooseWorkspaceComponent didSelectUser={() => onDidSelectUser()} />
  )
}