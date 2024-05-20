import React, { FunctionComponent, useEffect, useState } from "react";
import { useApp } from "../../../hooks/app-context";
import { useConfig } from "../../../hooks/config-context";
import { AzureAdSsoButtonComponent } from "../shared/AzureAdSsoButtonComponent";
import { GoogleSsoButtonComponent } from "../shared/GoogleSsoButtonComponent";
import { FederationType } from "../../../utils/AuthService";
import { LinkedinSsoButtonComponent } from "../shared/LinkedinSsoButtonComponent";
import { GithubSsoButtonComponent } from "../shared/GithubSsoButtonComponent";
import { AppleSsoButtonComponent } from "../shared/AppleSsoButtonComponent";
import { FacebookSsoButtonComponent } from "../shared/FacebookSsoButtonComponent";

interface LoginAlternativesComponentProps {
  label: "login" | "signup" | "continue";
  forceFederation?: FederationType;
  didClickSsoBtn: (type: FederationType) => void;
  hasAlternatives?: (val: boolean) => void;
}

const SsoButtonsComponent: FunctionComponent<
  LoginAlternativesComponentProps
> = ({ didClickSsoBtn, label, hasAlternatives, forceFederation }) => {
  const { authLegacy } = useConfig();
  const [_hasAlternatives, _setHasAlternatives] = useState(false);
  const {
    azureAdSsoEnabled,
    googleSsoEnabled,
    linkedinSsoEnabled,
    facebookSsoEnabled,
    githubSsoEnabled,
    appleSsoEnabled,
  } = useApp();

  // Show SSO Login btn if we have it enabled
  const azureAdLogin =
    !authLegacy &&
    azureAdSsoEnabled &&
    (label != "continue" || forceFederation === "ms-azure-ad");
  const googleLogin =
    !authLegacy &&
    googleSsoEnabled &&
    (label != "continue" || forceFederation === "google");
  const facebookLogin =
    !authLegacy &&
    facebookSsoEnabled &&
    (label != "continue" || forceFederation === "facebook");
  const appleLogin =
    !authLegacy &&
    appleSsoEnabled &&
    (label != "continue" || forceFederation === "apple");
  const githubLogin =
    !authLegacy &&
    githubSsoEnabled &&
    (label != "continue" || forceFederation === "github");
  const linkedinLogin =
    !authLegacy &&
    linkedinSsoEnabled &&
    (label != "continue" || forceFederation === "linkedin");

  useEffect(() => {
    _setHasAlternatives(
      !!(
        azureAdLogin ||
        googleLogin ||
        facebookLogin ||
        appleLogin ||
        githubLogin ||
        linkedinLogin
      )
    );
  }, [
    azureAdLogin,
    googleLogin,
    facebookLogin,
    appleLogin,
    githubLogin,
    linkedinLogin,
  ]);

  useEffect(() => {
    if (hasAlternatives) hasAlternatives(_hasAlternatives);
  }, [_hasAlternatives]);

  const renderAzureAd = () => {
    if (azureAdLogin) {
      return (
        <AzureAdSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("ms-azure-ad")}
        ></AzureAdSsoButtonComponent>
      );
    }
  };

  const renderGoogle = () => {
    if (googleLogin) {
      return (
        <GoogleSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("google")}
        ></GoogleSsoButtonComponent>
      );
    }
  };

  const renderFacebook = () => {
    if (facebookLogin) {
      return (
        <FacebookSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("facebook")}
        ></FacebookSsoButtonComponent>
      );
    }
  };

  const renderApple = () => {
    if (appleLogin) {
      return (
        <AppleSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("apple")}
        ></AppleSsoButtonComponent>
      );
    }
  };

  const renderGithub = () => {
    if (githubLogin) {
      return (
        <GithubSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("github")}
        ></GithubSsoButtonComponent>
      );
    }
  };

  const renderLinkedin = () => {
    if (linkedinLogin) {
      return (
        <LinkedinSsoButtonComponent
          label={label}
          onClick={() => didClickSsoBtn("linkedin")}
        ></LinkedinSsoButtonComponent>
      );
    }
  };

  return (
    <>
      {renderGoogle()}
      {renderAzureAd()}
      {renderApple()}
      {renderFacebook()}
      {renderGithub()}
      {renderLinkedin()}
    </>
  );
};

export { SsoButtonsComponent };
