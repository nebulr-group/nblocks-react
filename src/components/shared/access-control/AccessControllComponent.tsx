import React, { FunctionComponent } from "react";
import { NBPlanAccessControlComponent } from "./PlanAccessControllComponent";
import { NBRoleAccessControlComponent } from "./RoleAccessControllComponent";

type ComponentProps = {
  plans?: string[];
  roles?: string[];
  children?: React.ReactNode;
};

/**
 * This component combine the usage of NBRoleAccessControlComponent and NBPlanAccessControlComponent
 * @param param0
 * @returns
 */
const NBAccessControlComponent: FunctionComponent<ComponentProps> = ({
  children,
  roles,
  plans,
}) => {
  const hasRoles = roles && roles.length > 0;
  const hasPlans = plans && plans.length > 0;

  let elements: React.ReactNode = null;

  if (hasRoles && hasPlans) {
    elements = (
      <NBRoleAccessControlComponent roles={roles}>
        <NBPlanAccessControlComponent plans={plans}>
          {children}
        </NBPlanAccessControlComponent>
      </NBRoleAccessControlComponent>
    );
  } else {
    if (hasRoles) {
      elements = (
        <NBRoleAccessControlComponent roles={roles}>
          {children}
        </NBRoleAccessControlComponent>
      );
    }

    if (hasPlans) {
      elements = (
        <NBPlanAccessControlComponent plans={plans}>
          {children}
        </NBPlanAccessControlComponent>
      );
    }
  }

  return elements;
};

export { NBAccessControlComponent };
