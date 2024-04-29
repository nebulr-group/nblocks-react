import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ChooseUserComponent } from "../../../components/auth/login/ChooseUserComponent";
import { useConfig } from "../../../hooks/config-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { useTranslation } from "react-i18next";
import { useRedirect } from "../../../hooks/use-redirect";
import { useLog } from "../../../hooks/use-log";

export function ChooseUserScreen() {
  const { t } = useTranslation();
  document.title = t("Choose workspace");

  const [userSelected, setUserSelected] = useState(false);
  const [user, setUser] = useState<AuthTenantUserResponseDto>();
  const { authService } = useSecureContext();
  const { handoverRoute, authLegacy } = useConfig();
  const { log } = useLog();
  const location = useLocation();
  const { replace } = useRedirect();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;
  const urlSearch = new URLSearchParams(location.search);
  const autoSelect = urlSearch.get("autoSelect") === "false" ? false : true;

  const onDidSelectUser = async (user: AuthTenantUserResponseDto) => {
    if (!authLegacy) {
      // Here we initiate the handover back to app
      replace(authService.getHandoverUrl(user.id)!);
    } else {
      setUser(user);
      setUserSelected(true);
      log("Choose user completed. Next step: onboarding");
    }
  };

  if (userSelected) {
    return (
      <Navigate
        to={RouteConfig.onboard.onboardingStart}
        state={{ targetUrl, user }}
      />
    );
  } else {
    return (
      <AuthLayoutWrapperComponent
        heading={t("Welcome back!")}
        subHeading={t("Choose a workspace you want to login into below.")}
      >
        <ChooseUserComponent
          didSelectUser={(user) => onDidSelectUser(user)}
          autoSelect={autoSelect}
        />
      </AuthLayoutWrapperComponent>
    );
  }
}
