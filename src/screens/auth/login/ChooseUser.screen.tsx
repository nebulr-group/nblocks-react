import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChooseUserComponent } from "../../../components/auth/login/ChooseUserComponent";
import { User } from "../../../generated/graphql";
import { useConfig } from "../../../hooks/config-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { RouteConfig } from "../../../routes/AuthRoutes";

export function ChooseUserScreen() {

  document.title = "Choose workspace";

  const {debug, handoverRoute} = useConfig();
  const navigate = useNavigate();
  const location = useLocation();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;
  
  const onDidSelectUser = async (user: AuthTenantUserResponseDto) => {
    if (!user.onboarded) {
      log(`User did authenticate but is not onboarded. Redirecting to user onboarding: ${targetUrl}`);
      navigate(RouteConfig.onboard.OnboardUserScreen, {state: {targetUrl}});
    } else {
      log(`User did authenticate. Redirecting back to: ${targetUrl}`);
      navigate(targetUrl);
    }
  }

  const log = (msg:string) => {
    if (debug) {
      console.log(msg);
    }
  }

  return (
    <ChooseUserComponent didSelectUser={(user) => onDidSelectUser(user)} />
  )
}