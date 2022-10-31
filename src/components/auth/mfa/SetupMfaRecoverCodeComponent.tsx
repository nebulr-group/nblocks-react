import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { HeadingComponent } from "../../shared/HeadingComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  recoverCode: string;
  didClickContinue: () => void;
};

const SetupMfaRecoverCodeComponent: FunctionComponent<ComponentProps> = ({
  didClickContinue,
  recoverCode,
}) => {
  return (
    <>
      {/* <div className="space-y-6"> */}
      <HeadingComponent
        size="4xl"
        type={"h1"}
        className="inline border-solid border border-gray-500 rounded-md py-3 px-4"
      >
        {recoverCode}
      </HeadingComponent>
      <NblocksButton
        size="md"
        type="primary"
        fullWidth={true}
        onClick={() => didClickContinue()}
      >
        Continue
      </NblocksButton>
      <LinkComponent
        to={RouteConfig.login.LoginScreen}
        type="primary"
        size="sm"
      >
        Back to login
      </LinkComponent>
    </>
  );
};

export { SetupMfaRecoverCodeComponent };
