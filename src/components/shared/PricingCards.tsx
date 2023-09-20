import React from "react";
import { FunctionComponent } from "react";
import { NblocksButton } from "./NblocksButton";
import { SkeletonLoader } from "./SkeletonLoader";
import {
  GetTenantDocument,
  PlanGraphql,
  PriceGraphql,
  UpdateTenantDocument,
} from "../../gql/graphql";
import { classNameFilter } from "../../utils/ComponentHelpers";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { PricingCard } from "./PricingCard";

type ConfigObject = {
  plans?: PlanGraphql[];
  loadingCardsData: boolean;
  cardPlaceholderCount?: number;
  className?: string;
  currency: string;
  recurrenceInterval: string;
  planSelectHandler: (paymentsRequired?: boolean) => void;
};

const PricingCards: FunctionComponent<ConfigObject> = ({
  plans,
  loadingCardsData,
  cardPlaceholderCount,
  className,
  currency,
  recurrenceInterval,
  planSelectHandler,
}) => {
  cardPlaceholderCount = cardPlaceholderCount ? cardPlaceholderCount : 3;

  // Getting Tenat instance
  const { data, loading, error } = useQuery(GetTenantDocument);
  const { t } = useTranslation();

  // Updating Tenant instance
  const [updateTenantMutation, updateTenantData] =
    useMutation(UpdateTenantDocument);

  const updatePlan = async (plankey: string) => {
    const result = await updateTenantMutation({
      variables: { tenant: { plan: plankey } },
    });
    if (result.data?.updateTenant) {
      planSelectHandler(result.data.updateTenant.paymentsRequired!);
    }
  };

  const isPriceValid = (price: PriceGraphql) => {
    return (
      price.currency === currency &&
      price.recurrenceInterval === recurrenceInterval
    );
  };

  const filteredPlans = plans
    ? plans.filter((plan) => plan.prices.some((price) => isPriceValid(price)))
    : [];

  const isLoading = loadingCardsData || loading;

  return (
    <div className={classNameFilter(className, "flex gap-4 justify-center")}>
      {isLoading &&
        [...Array(cardPlaceholderCount).keys()].map((_, i) => {
          return (
            <div className="min-h-8 border min-w-8 p-8 rounded-xl" key={i}>
              <div className="space-y-2">
                <SkeletonLoader className="w-full h-7 rounded-xl" />
                <SkeletonLoader className="w-14 h-12 mr-1 rounded-xl inline-block" />
                <SkeletonLoader className="w-8 h-8 rounded-xl inline-block" />
              </div>
              <div className="mt-6">
                <NblocksButton
                  type={"primary"}
                  size={"md"}
                  fullWidth={true}
                  disabled={true}
                >
                  {t("Get Started")}
                </NblocksButton>
              </div>
            </div>
          );
        })}
      {!isLoading &&
        filteredPlans.map(({ name, description, key, prices }, index) => {
          return (
            <PricingCard
              key={index}
              name={name}
              description={description ? description : ""}
              price={prices.find((price) => isPriceValid(price))}
              didSelect={() => updatePlan(key)}
              selected={key === data?.getTenant.plan}
            />
          );
        })}
    </div>
  );
};

export { PricingCards };
