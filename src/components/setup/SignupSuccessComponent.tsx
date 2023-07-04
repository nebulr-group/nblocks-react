import React, { FunctionComponent, ReactNode } from "react";
import { RouteConfig } from "../../routes/AuthRoutes";
import { HeadingComponent } from "../shared/HeadingComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { TextComponent } from "../shared/TextComponent";
import { CreateAppResponse } from "./SignupComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  response: CreateAppResponse;
  children?: ReactNode;
};

const SignupSuccessComponent: FunctionComponent<ComponentProps> = ({
  response,
}) => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <div className="flex items-baseline">
        <HeadingComponent type={"h2"} size="xl" className="font-semibold mr-2">
          {t("Application ID")}
        </HeadingComponent>
        <TextComponent>{response.app.id}</TextComponent>
      </div>
      <div className="flex items-baseline">
        <HeadingComponent type={"h2"} size="xl" className="font-semibold mr-2">
          {t("Api key")}
        </HeadingComponent>
        <TextComponent>{response.apiKey}</TextComponent>
      </div>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </div>
  );
};

export { SignupSuccessComponent };
