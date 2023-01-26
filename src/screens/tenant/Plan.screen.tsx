import React, { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { TenantLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { useConfig } from "../../hooks/config-context";
import { RouteConfig } from "../../routes/AuthRoutes";

const PlanScreen: FunctionComponent<{}> = () => {
  // This is a fix to not show flicker when the chooseUserComponent is loading tenantUsers and redirect if the user has just one
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handoverRoute, debug } = useConfig();

  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const planSelectHandler = (paymentsRequired?: boolean) => {
    switch (paymentsRequired) {
      case true:
        log(
          `The plan selected requires payment to be setup. Redirecting to ${RouteConfig.tenant.payment} `
        );
        return navigate(RouteConfig.tenant.payment);
      case false:
      default:
        return navigate(targetUrl);
    }
  };

  const onDidFinishInitialLoading = () => {
    setShowContent(true);
  };

  // If there's no plans to show, redirect back to app
  const onDidRecieveNoPlans = () => {
    log(`No plans configured. Redirecting back to ${targetUrl} `);
    navigate(targetUrl);
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
        didFinishedInitialLoading={() => onDidFinishInitialLoading()}
      />
    </TenantLayoutWrapperComponent>
  );
};

export { PlanScreen };
