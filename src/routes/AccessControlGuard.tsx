import React, { FunctionComponent } from "react";
import { NBAuthGuard, NBPlanAccessControlGuard } from "..";
import { NBRoleAccessControlGuard } from "./RoleAccessControlGuard";

type ComponentProps = {
  plans?: string[];
  roles?: string[];
  children: React.ReactElement;
};

/**
 * This component combine the usage of NBAuthGuard and NBRoleAccessControlGuard and NBPlanAccessControlGuard
 * @param param0
 * @returns
 */
const NBAccessControlGuard: FunctionComponent<ComponentProps> = ({
  children,
  plans,
  roles,
}) => {
  const hasRoles = roles && roles.length > 0;
  const hasPlans = plans && plans.length > 0;

  let elements: React.ReactNode = null;

  if (hasRoles && hasPlans) {
    elements = (
      <NBAuthGuard>
        <NBRoleAccessControlGuard roles={roles}>
          <NBPlanAccessControlGuard plans={plans}>
            {children}
          </NBPlanAccessControlGuard>
        </NBRoleAccessControlGuard>
      </NBAuthGuard>
    );
  } else {
    if (hasRoles) {
      elements = (
        <NBAuthGuard>
          <NBRoleAccessControlGuard roles={roles}>
            {children}
          </NBRoleAccessControlGuard>
        </NBAuthGuard>
      );
    }

    if (hasPlans) {
      elements = (
        <NBAuthGuard>
          <NBPlanAccessControlGuard plans={plans}>
            {children}
          </NBPlanAccessControlGuard>
        </NBAuthGuard>
      );
    }
  }

  return elements;
};

export { NBAccessControlGuard };
