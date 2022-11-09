import React, { FunctionComponent } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";

const PlanScreen: FunctionComponent<{}> = () => {
  return (
    <AuthLayoutWrapperComponent
      heading={"Pricing plans"}
      subHeading={
        "We belive Nblocks should be available to all companies, no matter the size."
      }
    >
      <span>Monthly Billing</span>
      <span>Annual Billing</span>
    </AuthLayoutWrapperComponent>
  );
};

export { PlanScreen };
