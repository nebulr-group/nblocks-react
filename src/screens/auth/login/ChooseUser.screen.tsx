import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ChooseUserComponent } from "../../../components/auth/login/ChooseUserComponent";
import { App, GetTenantDocument, Tenant } from "../../../gql/graphql";
import { useApp } from "../../../hooks/app-context";
import { useConfig } from "../../../hooks/config-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { RouteConfig } from "../../../routes/AuthRoutes";

export function ChooseUserScreen() {
  document.title = "Choose workspace";

  // This is a fix to not show flicker when the chooseUserComponent is loading tenantUsers and redirect if the user has just one
  const [showContent, setShowContent] = useState(false);
  const { debug, handoverRoute } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [tenantQuery, tenantQueryData] = useLazyQuery(GetTenantDocument);
  const app = useApp();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onDidFinishInitialLoading = () => {
    setShowContent(true);
  };

  const onDidSelectUser = async (user: AuthTenantUserResponseDto) => {
    if (!user.onboarded) {
      log(
        `User did authenticate but is not onboarded. Redirecting to user onboarding: ${RouteConfig.onboard.onboardUserScreen}`
      );
      navigate(RouteConfig.onboard.onboardUserScreen, {
        state: { targetUrl },
      });
    } else {
      const query = await tenantQuery();
      const tenant = query.data?.getTenant;

      if (tenant) {
        if (shouldShowTenantOnboarding(user, tenant, app)) {
          navigate(RouteConfig.onboard.onboardTenantScreen, {
            state: { targetUrl },
          });
          log(
            `User did authenticate but tenant is required to be onboarded: ${RouteConfig.onboard.onboardTenantScreen}`
          );
        } else {
          if (shouldShowChoosePlanScreen(user, query.data?.getTenant)) {
            log(
              `User did authenticate but tenant is required to pick a plan or setup payment. Redirecting to tenant plan selection: ${RouteConfig.tenant.planScreen}`
            );
            navigate(RouteConfig.tenant.planScreen, { state: { targetUrl } });
          } else {
            log(
              `User did authenticate. No payments required from Tenant. Redirecting back to: ${targetUrl}`
            );
            navigate(targetUrl);
          }
        }
      }
    }
  };

  /** This view should be shown to Owners of tenants that are not onboarded. And just in case app.onboardingFlow is B2B */
  const shouldShowTenantOnboarding = (
    user: AuthTenantUserResponseDto,
    tenant: Tenant,
    app: App
  ): boolean => {
    return (
      !tenant.onboarded && app.onboardingFlow === "B2B" && user.role === "OWNER"
    );
  };

  // This view should be shown to Owners and in case the tenant needs to setup payment
  const shouldShowChoosePlanScreen = (
    user: AuthTenantUserResponseDto,
    tenant?: Tenant
  ): boolean => {
    return (
      user.role === "OWNER" && (!tenant?.plan || !tenant?.paymentsRequired)
    );
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <div style={showContent ? {} : { display: "none" }}>
      <AuthLayoutWrapperComponent
        heading={tenantQueryData.loading ? "Logging in..." : "Welcome back!"}
        subHeading={
          tenantQueryData.loading
            ? ""
            : "Choose a workspace you want to login into below."
        }
      >
        {!tenantQueryData.loading && (
          <ChooseUserComponent
            didSelectUser={(user) => onDidSelectUser(user)}
            didFinishedInitialLoading={() => onDidFinishInitialLoading}
          />
        )}
      </AuthLayoutWrapperComponent>
    </div>
  );
}
