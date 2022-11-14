import React from "react";
import { FunctionComponent } from "react";
import { HeadingComponent } from "./HeadingComponent";
import { NblocksButton } from "./NblocksButton";
import { TextComponent } from "./TextComponent";
import { SkeletonLoader } from "./SkeletonLoader";
import { PlanGraphql } from "../../gql/graphql";
import {
  classNameFilter,
  getCurrencySymbol,
} from "../../utils/ComponentHelpers";
import { useParams } from "react-router-dom";

type ConfigObject = {
  plans?: PlanGraphql[];
  loading: boolean;
  cardPlaceholderCount?: number;
  className?: string;
  region: string;
};

const PricingCards: FunctionComponent<ConfigObject> = ({
  plans,
  loading,
  cardPlaceholderCount,
  className,
  region,
}) => {
  cardPlaceholderCount = cardPlaceholderCount ? cardPlaceholderCount : 3;
  const { planName } = useParams();

  const checkPlan = (plan: PlanGraphql) => {
    return plan.name === planName;
  };

  return (
    <div className={classNameFilter(className, "flex gap-4 justify-center")}>
      {loading &&
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
                  Get Started
                </NblocksButton>
              </div>
            </div>
          );
        })}
      {!loading &&
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
                    if (price.region === region) {
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
                    planName === name || !plans.some(checkPlan) || !planName
                      ? "primary"
                      : "secondary"
                  }
                  size={"md"}
                  fullWidth={true}
                >
                  Get Started
                </NblocksButton>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export { PricingCards };
