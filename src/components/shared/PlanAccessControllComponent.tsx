import { useQuery } from "@apollo/client";
import React, { FunctionComponent } from "react";
import { GetTenantDocument } from "../../gql/graphql";

/**
 * This component shows or hides its children if a tenant has certain role
 * @param param0
 * @returns
 */
const PlanAccessControllComponent: FunctionComponent<{
  plans: string[];
  children?: React.ReactNode;
  hiddenChildren?: React.ReactNode;
}> = ({ children, plans, hiddenChildren }) => {
  const { data, loading, error } = useQuery(GetTenantDocument);
  if (plans.some((plan) => plan === data?.getTenant.plan))
    return <>{children}</>;
  else return hiddenChildren ? <>{hiddenChildren}</> : null;
};

export { PlanAccessControllComponent };
