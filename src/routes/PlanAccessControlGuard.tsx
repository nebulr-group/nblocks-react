import { useQuery } from "@apollo/client";
import React from "react";
import { Navigate } from "react-router-dom";
import { GetTenantDocument } from "../gql/graphql";
import { useConfig } from "../hooks/config-context";
import { useLog } from "../hooks/use-log";

/**
 * This is a route guard that checks if current user belongs to a tenant with a given subscription plan.
 * If not, the user will be redirected back to handover route.
 */
function NBPlanAccessControlGuard({
  children,
  plans,
}: {
  children: React.ReactElement;
  plans: string[];
}) {
  const { handoverRoute } = useConfig();
  const { log } = useLog();

  const { data, loading, error } = useQuery(GetTenantDocument);
  if (!plans.some((plan) => plan === data?.getTenant.plan)) {
    log(
      `NBPlanAccessControlGuard: Route is restricted. Redirecting to ${handoverRoute}`
    );

    return <Navigate to={handoverRoute} replace />;
  }

  return children;
}

export { NBPlanAccessControlGuard };
