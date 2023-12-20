import React, { FunctionComponent } from "react";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";
import { TextComponent } from "../shared/TextComponent";
import { useConfig } from "../../hooks/config-context";
import { FederationType } from "../../utils/AuthService";
import { AzureAdSsoButtonComponent } from "./shared/AzureAdSsoButtonComponent";
import { GoogleSsoButtonComponent } from "./shared/GoogleSsoButtonComponent";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  didSignup: (email: string) => void;
  didClickFederatedSignup: (type: FederationType) => void;
  federation: FederationType;
};

const SignupMissingUserComponent: FunctionComponent<ComponentProps> = ({
  didClickFederatedSignup,
  federation,
}) => {
  const { authLegacy, demoSSO } = useConfig();
  const {
    azureAdSsoEnabled,
    googleSsoEnabled,
    privacyPolicyUrl,
    termsOfServiceUrl,
  } = useApp();
  const { t } = useTranslation();

  // Show SSO Login btn if we have it enabled or demoSSO is true
  const azureAdLogin = !authLegacy && (azureAdSsoEnabled || demoSSO);
  const googleLogin = !authLegacy && (googleSsoEnabled || demoSSO);

  const signupMiddleware = (type: FederationType) => {
    didClickFederatedSignup(type);
  };

  const renderSignupAlternatives = () => {
    if (googleLogin && federation === "google") {
      return (
        <GoogleSsoButtonComponent
          label="continue"
          onClick={() => signupMiddleware("google")}
        ></GoogleSsoButtonComponent>
      );
    } else if (azureAdLogin && federation === "ms-azure-ad") {
      return (
        <AzureAdSsoButtonComponent
          label="continue"
          onClick={() => signupMiddleware("ms-azure-ad")}
        ></AzureAdSsoButtonComponent>
      );
    }
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
      {renderSignupAlternatives()}
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

export { SignupMissingUserComponent };
