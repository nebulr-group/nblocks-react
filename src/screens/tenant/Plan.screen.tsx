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
  const { handoverRoute, debug } = useConfig();
  const { data, loading, error } = useQuery(GetTenantDocument);
  const planSelectHandler = () => {
    if (data) {
      const paymentsRequired = data.getTenant.paymentsRequired;

      switch (paymentsRequired) {
        case false:
          return navigate(handoverRoute);
        case true:
          log(
            `The plan selected requires payment to be setup. Redirecting to ${RouteConfig.tenant.payment} `
          );
          return navigate(RouteConfig.tenant.payment);
      }
    }
  };

  // If there's no plans to show, redirect back to app
  const onDidRecieveNoPlans = () => {
    log(`No plans configured. Redirecting back to ${handoverRoute} `);
    navigate(handoverRoute);
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <TenantLayoutWrapperComponent
      heading={"Pricing plans"}
      subHeading={
        "We belive Nblocks should be available to all companies, no matter the size."
      }
    >
      <ChoosePlanComponent
        planSelectHandler={planSelectHandler}
        didRecieveNoPlans={() => onDidRecieveNoPlans()}
      />
    </TenantLayoutWrapperComponent>
  );
};

export { PlanScreen };
