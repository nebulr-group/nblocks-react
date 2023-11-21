import React, { FunctionComponent } from "react";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { BaseLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { useConfig } from "../../hooks/config-context";
import { useTranslation } from "react-i18next";
import { useSecureContext } from "../../hooks/secure-http-context";
import { PaymentsService } from "../../utils/PaymentsService";
import { TenantPaymentStatusGraphql } from "../../gql/graphql";
import { BackendlessService } from "../../utils/BackendlessService";

const PlanScreen: FunctionComponent<{}> = () => {
  const { debug } = useConfig();
  const { t } = useTranslation();
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
        log(`The plan selected doesn't require more config. Returning to app`);
        handoverBackToApp();
        break;
    }
  };

  const customerPortalHandler = () => {
    paymentService.redirectToSubscriptionPortal();
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
      subHeading={t("Select a plan to continue to the app")}
    >
      <ChoosePlanComponent
        planSelectHandler={planSelectHandler}
        didRecieveNoPlans={() => onDidRecieveNoPlans()}
        didClickCustomerPortal={() => customerPortalHandler()}
      />
    </BaseLayoutWrapperComponent>
  );
};

export { PlanScreen };
