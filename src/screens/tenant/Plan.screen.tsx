import React, { FunctionComponent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { BaseLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { useConfig } from "../../hooks/config-context";
import { useTranslation } from "react-i18next";
import { useSecureContext } from "../../hooks/secure-http-context";
import { PaymentsService } from "../../utils/PaymentsService";
import { AuthService } from "../../utils/AuthService";
import { TenantPaymentStatusGraphql } from "../../gql/graphql";
import { BackendlessService } from "../../utils/BackendlessService";

const PlanScreen: FunctionComponent<{}> = () => {
  // This is a fix to not show flicker when the chooseUserComponent is loading tenantUsers and redirect if the user has just one
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { handoverRoute, debug } = useConfig();
  const { t } = useTranslation();
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;
  const { authHttpClient } = useSecureContext();
  const config = useConfig();

  const backendlessService = new BackendlessService(
    authHttpClient.httpClient,
    config
  );

  const paymentService = new PaymentsService(authHttpClient.httpClient, config);

  const planSelectHandler = (paymentStatus: TenantPaymentStatusGraphql) => {
    switch (paymentStatus.shouldSetupPayments) {
      case true:
        log(
          `The plan selected requires payment to be setup. Redirecting to backendless`
        );
        paymentService.redirectToCheckoutView();
        break;
      case false:
      default:
        handoverBackToApp();
        break;
    }
  };

  const customerPortalHandler = () => {
    paymentService.redirectToSubscriptionPortal();
  };

  const onDidFinishInitialLoading = () => {
    setShowContent(true);
  };

  // If there's no plans to show, redirect back to app
  const onDidRecieveNoPlans = () => {
    log(`No plans configured. Redirecting back`);
    handoverBackToApp();
  };

  const handoverBackToApp = () => {
    backendlessService.handoverToApp();
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  return (
    <BaseLayoutWrapperComponent
      heading={t("Pricing plans")}
      subHeading={t(
        "We belive Nblocks should be available to all companies, no matter the size."
      )}
    >
      <ChoosePlanComponent
        planSelectHandler={planSelectHandler}
        didRecieveNoPlans={() => onDidRecieveNoPlans()}
        didFinishedInitialLoading={() => onDidFinishInitialLoading()}
        didClickCustomerPortal={() => customerPortalHandler()}
      />
    </BaseLayoutWrapperComponent>
  );
};

export { PlanScreen };
