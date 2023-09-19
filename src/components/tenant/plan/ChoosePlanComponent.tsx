import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PricingCards } from "../../shared/PricingCards";
import { GetAppPlansDocument } from "../../../gql/graphql";
import { ListBoxComponent } from "../../shared/ListBoxComponent";
import { SkeletonLoader } from "../../shared/SkeletonLoader";

const ChoosePlanComponent: FunctionComponent<{
  planSelectHandler: (paymentsRequired?: boolean) => void;
  didRecieveNoPlans?: () => void;
  didFinishedInitialLoading?: () => void;
}> = ({ planSelectHandler, didRecieveNoPlans, didFinishedInitialLoading }) => {
  const [currency, setCurrency] = useState<string>("");
  const { data, loading } = useQuery(GetAppPlansDocument);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    const _currencies: string[] = [];

    if (!loading) {
      if (data && data?.getAppPlans.length > 0) {
        data?.getAppPlans.forEach(({ prices }) => {
          prices.forEach(({ currency }) => {
            !_currencies.includes(currency) && _currencies.push(currency);
          });
        });
        setCurrency(_currencies[0]);
        setCurrencies(_currencies);
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
        cardPlaceholderCount={2}
        planSelectHandler={planSelectHandler}
      ></PricingCards>
    </>
  );
};

export { ChoosePlanComponent };
