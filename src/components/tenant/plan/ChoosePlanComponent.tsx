import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PricingCards } from "../../shared/PricingCards";
import { GetAppPlansDocument } from "../../../gql/graphql";
import { ListBoxComponent } from "../../shared/ListBoxComponent";
import { SkeletonLoader } from "../../shared/SkeletonLoader";
import { TabsComponent } from "../../shared/TabsComponent";

const ChoosePlanComponent: FunctionComponent<{
  planSelectHandler: (paymentsRequired?: boolean) => void;
  didRecieveNoPlans?: () => void;
  didFinishedInitialLoading?: () => void;
}> = ({ planSelectHandler, didRecieveNoPlans, didFinishedInitialLoading }) => {
  const [currency, setCurrency] = useState<string>("");
  const [currencies, setCurrencies] = useState<string[]>([]);

  const [recurrenceInterval, setRecurrenceInterval] = useState<string>("");
  const [recurrenceIntervals, setRecurrenceIntervals] = useState<string[]>([]);
  const { data, loading } = useQuery(GetAppPlansDocument);

  useEffect(() => {
    const _currencies: string[] = [];
    const _recurrenceIntervals: string[] = [];

    if (!loading) {
      if (data && data?.getAppPlans.length > 0) {
        data?.getAppPlans.forEach(({ prices }) => {
          prices.forEach(({ currency, recurrenceInterval }) => {
            !_currencies.includes(currency) && _currencies.push(currency);
            !_recurrenceIntervals.includes(recurrenceInterval) &&
              _recurrenceIntervals.push(recurrenceInterval);
          });
        });
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
      <TabsComponent
        categories={recurrenceIntervals}
        onChange={(index) => setRecurrenceInterval(recurrenceIntervals[index])}
      />
      <div className="flex justify-end w-full">
        <div className="w-24 relative">
          {loading && currencies.length !== 1 && (
            <SkeletonLoader className="w-full h-12 rounded-md" />
          )}
          {!loading && currencies.length !== 1 && (
            <ListBoxComponent
              items={currencies}
              selected={currency}
              setSelected={setCurrency}
            ></ListBoxComponent>
          )}
        </div>
      </div>
      <PricingCards
        plans={data?.getAppPlans}
        loadingCardsData={loading}
        className={"mt-24"}
        currency={currency}
        recurrenceInterval={recurrenceInterval}
        cardPlaceholderCount={2}
        planSelectHandler={planSelectHandler}
      ></PricingCards>
    </>
  );
};

export { ChoosePlanComponent };
