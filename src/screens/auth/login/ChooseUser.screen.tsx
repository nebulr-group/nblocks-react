import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ChooseUserComponent } from "../../../components/auth/login/ChooseUserComponent";
import { GetTenantDocument } from "../../../gql/graphql";
import { useConfig } from "../../../hooks/config-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { RouteConfig } from "../../../routes/AuthRoutes";

export function ChooseUserScreen() {
  document.title = "Choose workspace";

  const { debug, handoverRoute } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [tenantQuery, tenantQueryData] = useLazyQuery(GetTenantDocument);

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onDidSelectUser = async (user: AuthTenantUserResponseDto) => {
    if (!user.onboarded) {
      log(
        `User did authenticate but is not onboarded. Redirecting to user onboarding: ${RouteConfig.onboard.OnboardUserScreen}`
      );
      navigate(RouteConfig.onboard.OnboardUserScreen, {
        state: { targetUrl: targetUrl },
      });
    } else {
      const tenant = await tenantQuery();
      if (tenant.data?.getTenant.paymentsRequired) {
        log(
          `User did authenticate. Tenant is required to setup payment. Redirecting to tenant plan selection: ${RouteConfig.tenant.plan}`
        );
        navigate(RouteConfig.tenant.plan);
      } else {
        log(
          `User did authenticate. No payments required from Tenant. Redirecting back to: ${targetUrl}`
        );
        navigate(targetUrl);
      }
    }
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={tenantQueryData.loading ? "Logging in..." : "Welcome back!"}
      subHeading={
        tenantQueryData.loading
          ? ""
          : "Choose a workspace you want to login into below."
      }
    >
      {!tenantQueryData.loading && (
        <ChooseUserComponent didSelectUser={(user) => onDidSelectUser(user)} />
      )}
    </AuthLayoutWrapperComponent>
  );
}
