import React, { FunctionComponent } from "react";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";
import { TextComponent } from "../shared/TextComponent";
import { FederationType } from "../../utils/AuthService";
import { useTranslation } from "react-i18next";
import { SsoButtonsComponent } from "./login/SsoButtonsComponent";

type ComponentProps = {
  didSignup: (email: string) => void;
  didClickFederatedSignup: (type: FederationType) => void;
  federation: FederationType;
};

const ContinueSignupFederationComponent: FunctionComponent<ComponentProps> = ({
  didClickFederatedSignup,
  federation,
}) => {
  const { privacyPolicyUrl, termsOfServiceUrl } = useApp();
  const { t } = useTranslation();

  const signupMiddleware = (type: FederationType) => {
    didClickFederatedSignup(type);
  };

  return (
    <div className="max-w-sm w-full">
      <TextComponent size="sm" className="mb-3">
        {t("By proceeding you agree to the Nblocks")}
        &nbsp;
        <LinkComponent
          type="primary"
          to={privacyPolicyUrl!}
          nativeBehavior={true}
          target="_blank"
          size="sm"
          className="font-semibold"
        >
          {t("privacy policy")}
        </LinkComponent>
        &nbsp;&amp;&nbsp;
        <LinkComponent
          type="primary"
          to={termsOfServiceUrl!}
          nativeBehavior={true}
          target="_blank"
          size="sm"
          className="font-semibold"
        >
          {t("terms of use")}
        </LinkComponent>
      </TextComponent>
      <SsoButtonsComponent
        didClickSsoBtn={signupMiddleware}
        label="continue"
        forceFederation={federation}
      />
      <div className="mt-8 text-center">
        <TextComponent size="sm">
          {t("Or return to")}&nbsp;
          <LinkComponent
            to={RouteConfig.login.loginScreen}
            type="primary"
            size="sm"
            className="font-semibold"
          >
            {t("login")}
          </LinkComponent>
        </TextComponent>
      </div>
    </div>
  );
};

export { ContinueSignupFederationComponent };
