import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { AlertComponent } from "../../shared/AlertComponent";
import { useConfig } from "../../../hooks/config-context";
import { useTranslation } from "react-i18next";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { SetPasskeysComponent } from "./SetPasskeysComponent";
import { DividerComponent } from "../../shared/DividerComponent";
import { useApp } from "../../../hooks/app-context";
import { PasswordInputComponent } from "./PasswordInputComponent";
import { LoginSessionCreatedResponse } from "../../../utils/OAuthService";

type ComponentProps = {
  didSetPassword: (session?: LoginSessionCreatedResponse) => void;
  resetToken: string;
};

const SetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSetPassword,
  resetToken,
}) => {
  const { authService } = useSecureContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { authLegacy } = useConfig();
  const { t } = useTranslation();
  const { passkeysEnabled } = useApp();

  const passkeysLogin =
    !authLegacy && passkeysEnabled && browserSupportsWebAuthn();

  const onDidSetPasskeys = () => {
    didSetPassword();
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.updatePassword(
        resetToken,
        newPassword
      );
      didSetPassword(response.session);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg(
          t(
            "The link has expired. You need to request a new reset password link again."
          )
        );
      } else {
        setErrorMsg(
          t(
            "There was an error when logging in. Try again, otherwise contact support."
          )
        );
      }
      setFormIsValid(false);
      setSubmitError(true);
      setIsLoading(false);
    }
  };

  const onDidProvideValidPassword = (password: string) => {
    setNewPassword(password);
    setFormIsValid(true);
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        <PasswordInputComponent
          didProvideValidPassword={onDidProvideValidPassword}
          submitError={submitError}
        />
        <div>
          <NblocksButton
            submit={true}
            size="md"
            type="primary"
            isLoading={isLoading}
            fullWidth={true}
            disabled={!formIsValid}
          >
            {t("Set a password")}
          </NblocksButton>
        </div>
        {passkeysLogin && (
          <>
            <div className="py-2">
              <DividerComponent text={t("Or")} />
            </div>
            <SetPasskeysComponent
              didSetPasskeys={onDidSetPasskeys}
              resetToken={resetToken}
            />
          </>
        )}
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold "
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { SetPasswordComponent };
