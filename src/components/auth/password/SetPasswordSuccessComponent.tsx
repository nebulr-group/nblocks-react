import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { LinkComponent } from "../../shared/LinkComponent";

type ComponentProps = {};

const SetPasswordSuccessComponent: FunctionComponent<ComponentProps> = ({}) => {
  return (
    <>
      <div>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { SetPasswordSuccessComponent };
