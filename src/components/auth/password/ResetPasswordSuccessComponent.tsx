import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { LinkComponent } from "../../shared/LinkComponent";

type ComponentProps = {};

const ResetPasswordSuccessComponent: FunctionComponent<
  ComponentProps
> = ({}) => {
  return (
    <>
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

export { ResetPasswordSuccessComponent };
