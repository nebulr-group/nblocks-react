import React, { FunctionComponent } from "react";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { BaseLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { useConfig } from "../../hooks/config-context";
import { useTranslation } from "react-i18next";
import { useSecureContext } from "../../hooks/secure-http-context";
import { PaymentsService } from "../../utils/PaymentsService";
import { TenantPaymentStatusGraphql } from "../../gql/graphql";
import { BackendlessService } from "../../utils/BackendlessService";
import { useRedirect } from "../../hooks/use-redirect";
import { useLog } from "../../hooks/use-log";

const PlansScreen: FunctionComponent<{}> = () => {
  const { t } = useTranslation();
  const { authHttpClient } = useSecureContext();
  const config = useConfig();
  const { navigate } = useRedirect();
  const { log } = useLog();

  const backendlessService = new BackendlessService(
    authHttpClient.httpClient,
    config
  );

  const paymentService = new PaymentsService(authHttpClient.httpClient, config);

  const planSelectHandler = async (
    paymentStatus: TenantPaymentStatusGraphql
  ) => {
    switch (paymentStatus.shouldSetupPayments) {
      case true:
        log(
          `The plan selected requires payment to be setup. Redirecting to backendless`
        );
        const url = await paymentService.redirectToCheckoutViewUrl();
        navigate(url);
        break;
      case false:
      default:
        log(`The plan selected doesn't require more config. Returning to app`);
        await handoverBackToApp();
        break;
    }
  };

  const customerPortalHandler = async () => {
    const url = await paymentService.redirectToSubscriptionPortalUrl();
    navigate(url);
  };

  // If there's no plans to show, redirect back to app
  const onDidRecieveNoPlans = async () => {
    log(`No plans configured. Redirecting back`);
    await handoverBackToApp();
  };

  const handoverBackToApp = async () => {
    const url = await backendlessService.handoverToAppUrl();
    navigate(url);
  };

  return (
    <BaseLayoutWrapperComponent
      heading={t("Pricing plans")}
      subHeading={t("Click to change your subscription")}
    >
      <ChoosePlanComponent
        planSelectHandler={planSelectHandler}
        didRecieveNoPlans={() => onDidRecieveNoPlans()}
        didClickCustomerPortal={() => customerPortalHandler()}
      />
    </BaseLayoutWrapperComponent>
  );
};

export { PlansScreen };
