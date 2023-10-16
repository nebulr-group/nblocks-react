import React from "react";
import { FunctionComponent } from "react";
import { HeadingComponent } from "./HeadingComponent";
import { NblocksButton } from "./NblocksButton";
import { TextComponent } from "./TextComponent";
import { PriceGraphql } from "../../gql/graphql";
import {
  getCurrencySymbol,
  getRecurIntervalSymbol,
} from "../../utils/ComponentHelpers";
import { useTranslation } from "react-i18next";

type ConfigObject = {
  name: string;
  description: string;
  selected: boolean;
  trial: boolean;
  trialDays: number;
  price?: PriceGraphql;
  didSelect: () => void;
  loading: boolean;
};

const PricingCard: FunctionComponent<ConfigObject> = ({
  name,
  description,
  selected,
  didSelect,
  price,
  trial,
  trialDays,
  loading,
}) => {
  const { t } = useTranslation();
  const renderPrice = (price: PriceGraphql) => {
    if (!price.amount || price.amount === 0) {
      return (
        <span
          key={`${price.amount}-${price.currency}-${price.recurrenceInterval}`}
        >
          {t("FREE")}
          <br />
        </span>
      );
    } else {
      return (
        <span
          key={`${price.amount}-${price.currency}-${price.recurrenceInterval}`}
        >
          {`${getCurrencySymbol(price.currency)} ${price.amount}
                          `}
          <span className="text-lg">
            /{getRecurIntervalSymbol(price.recurrenceInterval)}
          </span>
          <br />
        </span>
      );
    }
  };

  const renderSelectText = () => {
    if (selected) {
      return t("Current");
    }

    if (trial && trialDays > 0) {
      return `${trialDays} ${t("day trial")}`;
    }

    return t("Get Started");
  };

  if (price) {
    return (
      <div className="min-h-8 border min-w-8 p-8 rounded-xl">
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
            {renderPrice(price)}
          </TextComponent>
        </div>
        <div className="mt-6">
          <NblocksButton
            type={selected ? "primary" : "secondary"}
            size={"md"}
            fullWidth={true}
            onClick={() => didSelect()}
            isLoading={loading}
          >
            {renderSelectText()}
          </NblocksButton>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { PricingCard };
