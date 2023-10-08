import React from "react";
import { FunctionComponent } from "react";
import { NblocksButton } from "./NblocksButton";
import { SkeletonLoader } from "./SkeletonLoader";
import {
  GetTenantDocument,
  GetTenantPaymentDetailsDocument,
  PlanGraphql,
  PriceGraphql,
  SetTenantPlanDetailsDocument,
  TenantPaymentStatusGraphql,
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
  planSelectHandler: (paymentStatus: TenantPaymentStatusGraphql) => void;
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
  const { t } = useTranslation();

  const { data: paymentDetailsQuery, loading: paymentDetailsLoading } =
    useQuery(GetTenantPaymentDetailsDocument);

  // Updating Tenant instance
  const [setTenantPaymentDetailsMutation, SetTenantPaymentDetailsData] =
    useMutation(SetTenantPlanDetailsDocument);

  const setPlanDetails = async (planKey: string, price: PriceGraphql) => {
    const result = await setTenantPaymentDetailsMutation({
      variables: {
        details: {
          planKey,
          price: {
            currency: price.currency,
            recurrenceInterval: price.recurrenceInterval,
          },
        },
      },
      refetchQueries: [GetTenantDocument, GetTenantPaymentDetailsDocument],
    });
    if (result.data?.setTenantPlanDetails) {
      planSelectHandler(result.data.setTenantPlanDetails.status);
    }
  };

  /**
   * Price should be displayed on this page since currency and recurrenceInterval matches
   * @param price
   * @returns
   */
  const isPriceValid = (price: PriceGraphql) => {
    return (
      price.currency === currency &&
      price.recurrenceInterval === recurrenceInterval
    );
  };

  const isPriceSelected = (planKey: string, price: PriceGraphql) => {
    const selectedPlan =
      paymentDetailsQuery?.getTenantPaymentDetails.details.plan;
    const selectedPrice =
      paymentDetailsQuery?.getTenantPaymentDetails.details.price;

    if (selectedPlan && selectedPrice) {
      return (
        selectedPlan.key === planKey &&
        selectedPrice.currency === price.currency &&
        selectedPrice.recurrenceInterval === price.recurrenceInterval
      );
    }

    return false;
  };

  const filteredPlans = plans
    ? plans.filter((plan) => plan.prices.some((price) => isPriceValid(price)))
    : [];

  const isLoading = loadingCardsData || paymentDetailsLoading;

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
          const price = prices.find((price) => isPriceValid(price));
          if (price) {
            return (
              <PricingCard
                key={index}
                name={name}
                description={description ? description : ""}
                price={price}
                didSelect={() => setPlanDetails(key, price)}
                selected={isPriceSelected(key, price)}
              />
            );
          }
        })}
    </div>
  );
};

export { PricingCards };
