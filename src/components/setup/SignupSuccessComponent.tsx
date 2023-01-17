import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";
import { TextComponent } from "../shared/TextComponent";
import { CreateAppResponse } from "./SignupComponent";

type ComponentProps = {
  response: CreateAppResponse;
};

const SignupSuccessComponent: FunctionComponent<ComponentProps> = ({
  response,
}) => {
  return (
    <div>
      {/* <TextComponent>App id {response.app.id}</TextComponent>
      <TextComponent>Api key {response.apiKey}</TextComponent> */}
      <LinkComponent
        to={RouteConfig.login.loginScreen}
        type={"secondary"}
        size="sm"
        className="font-semibold"
      >
        Back to login
      </LinkComponent>
    </div>
  );
};

export { SignupSuccessComponent };
