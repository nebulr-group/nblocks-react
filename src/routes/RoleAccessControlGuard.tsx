import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context";
import { useConfig } from "../hooks/config-context";
import { useLog } from "../hooks/use-log";

/**
 * This is a route guard that checks if current user has a certain role.
 * If not, the user will be redirected back to handover route.
 */
function NBRoleAccessControlGuard({
  children,
  roles,
}: {
  children: React.ReactElement;
  roles: string[];
}) {
  const { handoverRoute } = useConfig();
  const { currentUser } = useAuth();
  const { log } = useLog();

  if (!currentUser.user || !currentUser.hasRole(roles)) {
    log(
      `NBRoleAccessControlGuard: Route is restricted. Redirecting to ${handoverRoute}`
    );
    return <Navigate to={handoverRoute} replace />;
  }

  return children;
}

export { NBRoleAccessControlGuard };
