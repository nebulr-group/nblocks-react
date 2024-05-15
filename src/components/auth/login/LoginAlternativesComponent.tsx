import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
} from "@simplewebauthn/browser";
import React, { FunctionComponent, useEffect } from "react";
import { useApp } from "../../../hooks/app-context";
import { useConfig } from "../../../hooks/config-context";
import { DividerComponent } from "../../shared/DividerComponent";
import { PasskeysLoginButtonComponent } from "../shared/PasskeysLoginButtonComponent";
import { FederationType } from "../../../utils/AuthService";
import { useTranslation } from "react-i18next";
import { SsoButtonsComponent } from "./SsoButtonsComponent";
import { useState } from "react";
import { MagicLinkLoginButtonComponent } from "../shared/MagicLoginButtonComponent";

interface LoginAlternativesComponentProps {
  didClickPasskeysAuthenticate: (autofill: boolean) => void;
  didClickMagicLinkAuthenticate: () => void;
  didClickSocialLogin: (type: FederationType) => void;
}

const LoginAlternativesComponent: FunctionComponent<
  LoginAlternativesComponentProps
> = ({
  didClickPasskeysAuthenticate,
  didClickMagicLinkAuthenticate,
  didClickSocialLogin,
}) => {
  const { t } = useTranslation();
  const { authLegacy } = useConfig();
  const { passkeysEnabled } = useApp();
  const magicLinkEnabled = true;
  const [hasSsoAlternatives, setHasSsoAlternatives] = useState(false);

  const passkeysLogin =
    !authLegacy && passkeysEnabled && browserSupportsWebAuthn();

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

  const renderMagicKeyLogin = () => {
    if (passkeysLogin) {
      return (
        <MagicLinkLoginButtonComponent
          mode="login"
          onClick={() => didClickMagicLinkAuthenticate()}
        ></MagicLinkLoginButtonComponent>
      );
    }
  };

  const hasAlternatives =
    passkeysLogin || magicLinkEnabled || hasSsoAlternatives;
  return (
    <>
      {hasAlternatives && (
        <div className="py-2">
          <DividerComponent text={t("Or")} />
        </div>
      )}
      <div className="space-y-2">
        {renderPasskeysLogin()}
        {renderMagicKeyLogin()}
        <SsoButtonsComponent
          label="login"
          didClickSsoBtn={didClickSocialLogin}
          hasAlternatives={setHasSsoAlternatives}
        />
      </div>
    </>
  );
};

export { LoginAlternativesComponent };
