import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context";
import { useConfig } from "../hooks/config-context";

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
  const { debug, handoverRoute } = useConfig();
  const { currentUser } = useAuth();

  if (!currentUser.user || !currentUser.hasRole(roles)) {
    if (debug) {
      console.log(
        `NBRoleAccessControlGuard: Route is restricted. Redirecting to ${handoverRoute}`
      );
    }
    return <Navigate to={handoverRoute} replace />;
  }

  return children;
}

export { NBRoleAccessControlGuard };
