import { ArrowLeftIcon } from "@heroicons/react/24/solid";
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
        to={RouteConfig.login.loginScreen}
        type={"secondary"}
        size="sm"
        className="font-semibold flex items-center"
      >
        <ArrowLeftIcon className="w-5 inline-block mr-1 font-bold" /> Back to
        login
      </LinkComponent>
    </>
  );
};

export { ResetPasswordSuccessComponent };
