import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PricingCards } from "../../shared/PricingCards";
import { GetAppPlansDocument } from "../../../gql/graphql";
import { ListBoxComponent } from "../../shared/ListBoxComponent";
import { SkeletonLoader } from "../../shared/SkeletonLoader";

const ChoosePlanComponent: FunctionComponent = () => {
  const [region, setRegion] = useState<string>("");
  const { data, loading } = useQuery(GetAppPlansDocument);
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    const regions: string[] = [];

    if (!loading) {
      data?.getAppConfig.businessModel?.plans.forEach(({ prices }) => {
        prices.forEach(({ region }) => {
          !regions.includes(region) && regions.push(region);
        });
      });
      setRegion(regions[0]);
      setRegions(regions);
    }
  }, [loading]);

  return (
    <>
      <div className="flex justify-end w-full">
        <div className="w-24 relative">
          {loading && regions.length !== 1 && (
            <SkeletonLoader className="w-full h-12 rounded-md" />
          )}
          {!loading && regions.length !== 1 && (
            <ListBoxComponent
              items={regions}
              selected={region}
              setSelected={setRegion}
            ></ListBoxComponent>
          )}
        </div>
      </div>
      <PricingCards
        plans={data?.getAppConfig.businessModel?.plans}
        loading={loading}
        className={"mt-24"}
        region={region}
        cardPlaceholderCount={2}
      ></PricingCards>
    </>
  );
};

export { ChoosePlanComponent };
