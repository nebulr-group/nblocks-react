import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";

type ComponentProps = {};

const SignupSuccessComponent: FunctionComponent<ComponentProps> = ({}) => {
  return (
    <>
      <div>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { SignupSuccessComponent };
