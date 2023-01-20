import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ChooseUserComponent } from "../../../components/auth/login/ChooseUserComponent";
import { GetTenantDocument, Tenant } from "../../../gql/graphql";
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
        `User did authenticate but is not onboarded. Redirecting to user onboarding: ${RouteConfig.onboard.onboardUserScreen}`
      );
      navigate(RouteConfig.onboard.onboardUserScreen, {
        state: { targetUrl: targetUrl },
      });
    } else {
      const query = await tenantQuery();
      if (shouldShowChoosePlanScreen(user, query.data?.getTenant)) {
        log(
          `User did authenticate but tenant is required to pick a plan or setup payment. Redirecting to tenant plan selection: ${RouteConfig.tenant.planScreen}`
        );
        navigate(RouteConfig.tenant.planScreen);
      } else {
        log(
          `User did authenticate. No payments required from Tenant. Redirecting back to: ${targetUrl}`
        );
        navigate(targetUrl);
      }
    }
  };

  // This view should be shown to Owners and in case the tenant needs to setup payment
  const shouldShowChoosePlanScreen = (user: AuthTenantUserResponseDto, tenant?: Tenant) => {
    return user.role === 'OWNER' && (!tenant?.plan || tenant?.paymentsRequired);
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
