import React, { FunctionComponent } from "react";
import { ChoosePlanComponent } from "../../components/tenant/plan/ChoosePlanComponent";
import { TenantLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
// import { TabsComponent } from "../../components/shared/TabsComponent";

const PlanScreen: FunctionComponent<{}> = () => {
  return (
    <TenantLayoutWrapperComponent
      heading={"Pricing plans"}
      subHeading={
        "We belive Nblocks should be available to all companies, no matter the size."
      }
    >
      <ChoosePlanComponent />
    </TenantLayoutWrapperComponent>
  );
};

export { PlanScreen };
