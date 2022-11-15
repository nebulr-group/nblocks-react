import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { TenantLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { GetTenantDocument, GetTenantQuery } from "../../gql/graphql";
import { useConfig } from "../../hooks/config-context";
import { RouteConfig } from "../../routes/AuthRoutes";

// import { TabsComponent } from "../../components/shared/TabsComponent";

const PlanScreen: FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const { handoverRoute } = useConfig();
  const { data, loading, error } = useQuery(GetTenantDocument);
  const planSelectHandler = () => {
    if (data) {
      const paymentsRequired = data.getTenant.paymentsRequired;

      switch (paymentsRequired) {
        case false:
          return navigate(handoverRoute);
        case true:
          return navigate(RouteConfig.tenant.payment);
      }
    }
  };

  return (
    <TenantLayoutWrapperComponent
      heading={"Pricing plans"}
      subHeading={
        "We belive Nblocks should be available to all companies, no matter the size."
      }
    >
      <ChoosePlanComponent planSelectHandler={planSelectHandler} />
    </TenantLayoutWrapperComponent>
  );
};

export { PlanScreen };
