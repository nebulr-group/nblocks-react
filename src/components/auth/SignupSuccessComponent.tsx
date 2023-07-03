import React, { FunctionComponent } from "react";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {};

const SignupSuccessComponent: FunctionComponent<ComponentProps> = ({}) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { SignupSuccessComponent };
