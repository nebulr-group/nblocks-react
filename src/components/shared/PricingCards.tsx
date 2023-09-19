import React from "react";
import { FunctionComponent } from "react";
import { HeadingComponent } from "./HeadingComponent";
import { NblocksButton } from "./NblocksButton";
import { TextComponent } from "./TextComponent";
import { SkeletonLoader } from "./SkeletonLoader";
import {
  GetTenantDocument,
  PlanGraphql,
  UpdateTenantDocument,
} from "../../gql/graphql";
import {
  classNameFilter,
  getCurrencySymbol,
} from "../../utils/ComponentHelpers";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

type ConfigObject = {
  plans?: PlanGraphql[];
  loadingCardsData: boolean;
  cardPlaceholderCount?: number;
  className?: string;
  currency: string;
  planSelectHandler: (paymentsRequired?: boolean) => void;
};

const PricingCards: FunctionComponent<ConfigObject> = ({
  plans,
  loadingCardsData,
  cardPlaceholderCount,
  className,
  currency,
  planSelectHandler,
}) => {
  cardPlaceholderCount = cardPlaceholderCount ? cardPlaceholderCount : 3;

  // Getting Tenat instance
  const { data, loading, error } = useQuery(GetTenantDocument);
  const { t } = useTranslation();

  // Updating Tenant instance
  const [updateTenantMutation, updateTenantData] =
    useMutation(UpdateTenantDocument);

  // Checking the selected plan against the tenant picked plan
  const checkPlan = (plan: PlanGraphql) => {
    return plan.name === data?.getTenant.plan;
  };

  const updatePlan = async (plan: string) => {
    const result = await updateTenantMutation({
      variables: { tenant: { plan: plan } },
    });
    if (result.data?.updateTenant) {
      planSelectHandler(result.data.updateTenant.paymentsRequired!);
    }
  };

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
        plans &&
        plans?.map(({ name, prices }, index) => {
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
                <TextComponent className={"text-5xl font-semibold"}>
                  {prices.map((price) => {
                    if (price.currency === currency) {
                      return `${getCurrencySymbol(price.currency)} ${
                        price.amount
                      }`;
                    }
                  })}
                  <span className="text-lg">/mo</span>
                </TextComponent>
              </div>
              <div className="mt-6">
                <NblocksButton
                  type={
                    data?.getTenant.plan === name && plans.some(checkPlan)
                      ? "primary"
                      : "secondary"
                  }
                  size={"md"}
                  fullWidth={true}
                  onClick={() => updatePlan(name)}
                >
                  {t("Get Started")}
                </NblocksButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export { PricingCards };
