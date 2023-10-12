import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PricingCards } from "../../shared/PricingCards";
import { ListBoxComponent } from "../../shared/ListBoxComponent";
import { TabsComponent } from "../../shared/TabsComponent";
import {
  GetPaymentOptionsAnonymousDocument,
  GetTenantPaymentDetailsDocument,
  TenantPaymentStatusGraphql,
} from "../../../gql/graphql";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

const ChoosePlanComponent: FunctionComponent<{
  planSelectHandler: (paymentStatus: TenantPaymentStatusGraphql) => void;
  didRecieveNoPlans?: () => void;
  didFinishedInitialLoading?: () => void;
  didClickCustomerPortal?: () => void;
}> = ({
  planSelectHandler,
  didRecieveNoPlans,
  didFinishedInitialLoading,
  didClickCustomerPortal,
}) => {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<string>("");
  const [currencies, setCurrencies] = useState<string[]>([]);

  const [recurrenceInterval, setRecurrenceInterval] = useState<string>("");
  const [recurrenceIntervals, setRecurrenceIntervals] = useState<string[]>([]);
  const { data: paymentOptionsQuery, loading: paymentOptionsLoading } =
    useQuery(GetPaymentOptionsAnonymousDocument);

  const { data: paymentDetailsQuery, loading: paymentDetailsLoading } =
    useQuery(GetTenantPaymentDetailsDocument);

  const loading = paymentOptionsLoading && paymentDetailsLoading;

  useEffect(() => {
    const _currencies: string[] = [];
    const _recurrenceIntervals: string[] = [];

    if (!loading) {
      if (
        paymentOptionsQuery &&
        paymentOptionsQuery?.getPaymentOptionsAnonymous.plans &&
        paymentOptionsQuery?.getPaymentOptionsAnonymous.plans.length > 0
      ) {
        paymentOptionsQuery.getPaymentOptionsAnonymous.plans.forEach(
          ({ prices }) => {
            prices.forEach(({ currency, recurrenceInterval }) => {
              !_currencies.includes(currency) && _currencies.push(currency);
              !_recurrenceIntervals.includes(recurrenceInterval) &&
                _recurrenceIntervals.push(recurrenceInterval);
            });
          }
        );
        setCurrency(_currencies[0]);
        setCurrencies(_currencies);
        setRecurrenceInterval(_recurrenceIntervals[0]);
        setRecurrenceIntervals(_recurrenceIntervals);

        if (didFinishedInitialLoading) {
          didFinishedInitialLoading;
        }
      } else {
        if (didRecieveNoPlans) {
          didRecieveNoPlans();
        }
      }
    }
  }, [loading]);

  return (
    <>
      {recurrenceIntervals.length > 1 && (
        <TabsComponent
          categories={recurrenceIntervals}
          onChange={(index) =>
            setRecurrenceInterval(recurrenceIntervals[index])
          }
        />
      )}
      <div className="flex justify-end w-full">
        <div className="w-24 relative">
          {currencies.length > 1 && (
            <ListBoxComponent
              items={currencies}
              selected={currency}
              setSelected={setCurrency}
            ></ListBoxComponent>
          )}
        </div>
      </div>
      <PricingCards
        plans={
          paymentOptionsQuery?.getPaymentOptionsAnonymous.plans
            ? paymentOptionsQuery?.getPaymentOptionsAnonymous.plans
            : []
        }
        loadingCardsData={loading}
        className={"mt-24"}
        currency={currency}
        recurrenceInterval={recurrenceInterval}
        cardPlaceholderCount={2}
        planSelectHandler={planSelectHandler}
      ></PricingCards>
      {paymentDetailsQuery?.getTenantPaymentDetails.status.paymentsEnabled && (
        <div>
          <NblocksButton
            type={"primary"}
            size="2xl"
            onClick={didClickCustomerPortal}
          >
            {t("Manage payments")}
          </NblocksButton>
        </div>
      )}
    </>
  );
};

export { ChoosePlanComponent };
