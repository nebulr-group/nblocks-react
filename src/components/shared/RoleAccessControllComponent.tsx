import React, { FunctionComponent } from "react";
import { useAuth } from "../../hooks/auth-context";

/**
 * This component shows or hides its children if a user has certain role
 * @param param0
 * @returns
 */
const RoleAccessControllComponent: FunctionComponent<{
  roles: string[];
  children?: React.ReactNode;
  hiddenChildren?: React.ReactNode;
}> = ({ children, roles, hiddenChildren }) => {
  const { currentUser } = useAuth();
  if (currentUser.user && currentUser.hasRole(roles)) return <>{children}</>;
  else return hiddenChildren ? <>{hiddenChildren}</> : null;
};

export { RoleAccessControllComponent };
