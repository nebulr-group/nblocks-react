import React from "react";
import { FunctionComponent } from "react";
import { HeadingComponent } from "./HeadingComponent";
import { NblocksButton } from "./NblocksButton";
import { TextComponent } from "./TextComponent";
import { SkeletonLoader } from "./SkeletonLoader";
import {
  GetTenantDocument,
  PlanGraphql,
  PriceGraphql,
  UpdateTenantDocument,
} from "../../gql/graphql";
import {
  classNameFilter,
  getCurrencySymbol,
  getRecurIntervalSymbol,
} from "../../utils/ComponentHelpers";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

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

  const updatePlan = async (plan: string) => {
    const result = await updateTenantMutation({
      variables: { tenant: { plan: plan } },
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

  return (
    <div className={classNameFilter(className, "flex gap-4 justify-center")}>
      {loadingCardsData &&
        loading &&
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
      {!loadingCardsData &&
        !loading &&
        filteredPlans.map(({ name, description, key, prices }, index) => {
          return (
            <div className="min-h-8 border min-w-8 p-8 rounded-xl" key={index}>
              <div className="space-y-2">
                <HeadingComponent
                  type={"h2"}
                  size={"2xl"}
                  className={"text-purple-700 font-semibold"}
                >
                  {name}
                </HeadingComponent>
                <TextComponent>{description}</TextComponent>
                <TextComponent className={"text-5xl font-semibold"}>
                  {prices
                    .filter((price) => isPriceValid(price))
                    .map((price) => {
                      if (!price.amount || price.amount === 0) {
                        return (
                          <span key={price.key}>
                            {t("FREE")}
                            <br />
                          </span>
                        );
                      } else {
                        return (
                          <span key={price.key}>
                            {`${getCurrencySymbol(price.currency)} ${
                              price.amount
                            }
                          `}
                            <span className="text-lg">
                              /
                              {getRecurIntervalSymbol(price.recurrenceInterval)}
                            </span>
                            <br />
                          </span>
                        );
                      }
                    })}
                </TextComponent>
              </div>
              <div className="mt-6">
                <NblocksButton
                  type={key === data?.getTenant.plan ? "primary" : "secondary"}
                  size={"md"}
                  fullWidth={true}
                  onClick={() => updatePlan(key)}
                >
                  {key === data?.getTenant.plan
                    ? t("Current")
                    : t("Get Started")}
                </NblocksButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export { PricingCards };
