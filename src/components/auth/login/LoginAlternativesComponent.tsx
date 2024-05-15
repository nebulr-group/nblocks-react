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
import { GithubSsoButtonComponent } from "../shared/GithubSsoButtonComponent";
import { AppleSsoButtonComponent } from "../shared/AppleSsoButtonComponent";
import { FacebookSsoButtonComponent } from "../shared/FacebookSsoButtonComponent";

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
    // facebookSsoEnabled,
    // githubSsoEnabled,
    // appleSsoEnabled,
  } = useApp();

  const { facebookSsoEnabled, githubSsoEnabled, appleSsoEnabled } = {
    facebookSsoEnabled: true,
    githubSsoEnabled: true,
    appleSsoEnabled: true,
  };

  const passkeysLogin =
    !authLegacy && passkeysEnabled && browserSupportsWebAuthn();

  // Show SSO Login btn if we have it enabled
  const azureAdLogin = !authLegacy && azureAdSsoEnabled;
  const googleLogin = !authLegacy && googleSsoEnabled;
  const facebookLogin = !authLegacy && facebookSsoEnabled;
  const appleLogin = !authLegacy && appleSsoEnabled;
  const githubLogin = !authLegacy && githubSsoEnabled;
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

  const renderFacebook = () => {
    if (facebookLogin) {
      return (
        <FacebookSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("facebook")}
        ></FacebookSsoButtonComponent>
      );
    }
  };

  const renderApple = () => {
    if (appleLogin) {
      return (
        <AppleSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("apple")}
        ></AppleSsoButtonComponent>
      );
    }
  };

  const renderGithub = () => {
    if (githubLogin) {
      return (
        <GithubSsoButtonComponent
          label="login"
          onClick={() => didClickSocialLogin("github")}
        ></GithubSsoButtonComponent>
      );
    }
  };

  const renderLinkedin = () => {
    if (linkedinLogin) {
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
        {renderApple()}
        {renderFacebook()}
        {renderGithub()}
        {renderLinkedin()}
      </div>
    </>
  );
};

export { LoginAlternativesComponent };
