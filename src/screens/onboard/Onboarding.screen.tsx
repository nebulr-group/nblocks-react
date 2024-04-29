import { useLazyQuery, useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetTenantDocument, Tenant, App } from "../../gql/graphql";
import { useApp } from "../../hooks/app-context";
import { useAuth } from "../../hooks/auth-context";
import { useConfig } from "../../hooks/config-context";
import { AuthTenantUserResponseDto } from "../../models/auth-tenant-user-response.dto";
import { RouteConfig } from "../../routes/AuthRoutes";

/**
 * The purpose of this screen is to gather the logic needed for taking next step after a successful login
 * The flow is:
 * Login -> MFA? -> Choose user -> OnboardingStart -> Onboard user? -> Onboard tenant? -> Setup payment -> Handover
 *
 * This should be an entry point in which each step would redirect back to before taking next step.
 * This was stored in choose-user before and it was hard to follow
 */
const OnboardingScreen: FunctionComponent<{}> = () => {
  const { data } = useQuery(GetTenantDocument);
  const { currentUser } = useAuth();
  const location = useLocation();
  const { debug, handoverRoute } = useConfig();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onLoad = async (user: AuthTenantUserResponseDto) => {
    // if (!user.onboarded) {
    //   log(
    //     `User did authenticate but is not onboarded. Redirecting to user onboarding: ${RouteConfig.onboard.onboardUserScreen}`
    //   );
    //   navigate(RouteConfig.onboard.onboardUserScreen, {
    //     state: { targetUrl },
    //   });
    // } else {
    //   const tenant = data?.getTenant;
    //   if (tenant) {
    //     if (shouldShowTenantOnboarding(user, tenant, app)) {
    //       navigate(RouteConfig.onboard.onboardTenantScreen, {
    //         state: { targetUrl },
    //       });
    //       log(
    //         `User did authenticate but tenant is required to be onboarded: ${RouteConfig.onboard.onboardTenantScreen}`
    //       );
    //     } else {
    //       if (shouldShowChoosePlanScreen(user, tenant)) {
    //         log(
    //           `User did authenticate but tenant is required to pick a plan or setup payment. Redirecting to tenant plan selection: ${RouteConfig.tenant.planScreen}`
    //         );
    //         navigate(RouteConfig.tenant.planScreen, { state: { targetUrl } });
    //       } else {
    //         log(
    //           `User did authenticate. No payments required from Tenant. Redirecting back to: ${targetUrl}`
    //         );
    //         navigate(targetUrl);
    //       }
    //     }
    //   }
    // }
  };

  useEffect(() => {
    if (currentUser.user) {
      onLoad(currentUser.user!);
    }
  }, [data, currentUser]);

  /** This view should be shown to Owners of tenants that are not onboarded. And just in case app.onboardingFlow is B2B */
  // const shouldShowTenantOnboarding = (
  //   user: AuthTenantUserResponseDto,
  //   tenant: Tenant,
  //   app: App
  // ): boolean => {
  //   return (
  //     !tenant.onboarded && app.onboardingFlow === "B2B" && user.role === "OWNER"
  //   );
  // };

  // // This view should be shown to Owners and in case the tenant needs to setup payment
  // const shouldShowChoosePlanScreen = (
  //   user: AuthTenantUserResponseDto,
  //   tenant?: Tenant
  // ): boolean => {
  //   return (
  //     user.role === "OWNER" && (!tenant?.plan || !tenant?.paymentStatus?.shouldSetupPayments)
  //   );
  // };

  return <h1>Onboarding...</h1>;
};

export { OnboardingScreen };
