import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
} from "@simplewebauthn/browser";
import React, { FunctionComponent, useEffect } from "react";
import { useApp } from "../../../hooks/app-context";
import { useConfig } from "../../../hooks/config-context";
import { DividerComponent } from "../../shared/DividerComponent";
import { AzureAdSsoButtonComponent } from "../shared/AzureAdSsoButtonComponent";
import { GoogleSsoButtonComponent } from "../shared/GoogleSsoButtonComponent";
import { PasskeysLoginButtonComponent } from "../shared/PasskeysLoginButtonComponent";
import { FederationType } from "../../../utils/AuthService";
import { useTranslation } from "react-i18next";
import { LinkedinSsoButtonComponent } from "../shared/LinkedinSsoButtonComponent";

interface LoginAlternativesComponentProps {
  didClickPasskeysAuthenticate: (autofill: boolean) => void;
  didClickSocialLogin: (type: FederationType) => void;
}

const LoginAlternativesComponent: FunctionComponent<
  LoginAlternativesComponentProps
> = ({ didClickPasskeysAuthenticate, didClickSocialLogin }) => {
  const { t } = useTranslation();
  const { authLegacy } = useConfig();
  const {
    azureAdSsoEnabled,
    googleSsoEnabled,
    linkedinSsoEnabled,
    passkeysEnabled,
  } = useApp();

  const passkeysLogin =
    !authLegacy && passkeysEnabled && browserSupportsWebAuthn();

  // Show SSO Login btn if we have it enabled
  const azureAdLogin = !authLegacy && azureAdSsoEnabled;
  const googleLogin = !authLegacy && googleSsoEnabled;
  const linkedinLogin = !authLegacy && linkedinSsoEnabled;

  useEffect(() => {
    if (passkeysLogin) {
      browserSupportsWebAuthnAutofill().then((support) => {
        if (support) {
          didClickPasskeysAuthenticate(true);
        }
      });
    }
  }, []);

  const renderPasskeysLogin = () => {
    if (passkeysLogin) {
      return (
        <PasskeysLoginButtonComponent
          mode="login"
          onClick={() => didClickPasskeysAuthenticate(false)}
        ></PasskeysLoginButtonComponent>
      );
    }
  };

  const renderAzureAd = () => {
    if (azureAdLogin) {
      return (
        <AzureAdSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("ms-azure-ad")}
        ></AzureAdSsoButtonComponent>
      );
    }
  };

  const renderGoogle = () => {
    if (googleLogin) {
      return (
        <GoogleSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("google")}
        ></GoogleSsoButtonComponent>
      );
    }
  };

  const renderLinkedin = () => {
    if (linkedinSsoEnabled) {
      return (
        <LinkedinSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("linkedin")}
        ></LinkedinSsoButtonComponent>
      );
    }
  };

  const hasAlternatives =
    passkeysLogin || googleLogin || linkedinLogin || azureAdLogin;
  return (
    <>
      {hasAlternatives && (
        <div className="py-2">
          <DividerComponent text={t("Or")} />
        </div>
      )}
      <div className="space-y-2">
        {renderPasskeysLogin()}
        {renderGoogle()}
        {renderAzureAd()}
        {renderLinkedin()}
      </div>
    </>
  );
};

export { LoginAlternativesComponent };
