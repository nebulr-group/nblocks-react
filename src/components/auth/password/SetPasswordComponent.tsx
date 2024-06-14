import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";
import { ValidationMessageComponent } from "../../shared/ValidationMessageComponent";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { AlertComponent } from "../../shared/AlertComponent";
import { useConfig } from "../../../hooks/config-context";
import { useTranslation } from "react-i18next";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { SetPasskeysComponent } from "./SetPasskeysComponent";
import { DividerComponent } from "../../shared/DividerComponent";
import { useApp } from "../../../hooks/app-context";
import { Transition } from "@headlessui/react";

type ComponentProps = {
  didSetPassword: () => void;
  resetToken: string;
};

const SetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSetPassword,
  resetToken,
}) => {
  const { authService } = useSecureContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { passwordValidation, passwordComplexityRegex, authLegacy } =
    useConfig();
  const { t } = useTranslation();
  const { passkeysEnabled } = useApp();

  const passkeysLogin =
    !authLegacy && passkeysEnabled && browserSupportsWebAuthn();

  const {
    password: newPassword,
    feedbackLog: newPasswordFeedbackLog,
    passwordIsValid: newPasswordIsValid,
    onPasswordTextChangeValidation: onNewPasswordTextChangeValidation,
  } = usePasswordValidation();

  const { password: confirmPassword, setPassword: setConfirmPassword } =
    usePasswordValidation();

  const updateNewPasswordValue = (value: string) => {
    onNewPasswordTextChangeValidation(
      value,
      passwordComplexityRegex,
      !passwordValidation
    );
  };

  const onDidSetPasskeys = () => {
    didSetPassword();
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await authService.updatePassword(resetToken, newPassword);
      didSetPassword();
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
      onNewPasswordTextChangeValidation("");
      setConfirmPassword("");
      setIsLoading(false);
    }
  };

  const samePasswordValidator = (
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      return false;
    }

    return true;
  };

  let formIsValid = false;
  if (newPasswordIsValid) {
    formIsValid = samePasswordValidator(newPassword, confirmPassword);
  }
  const renderErrorMessages = !newPasswordIsValid;

  return (
    <>
      <div className="max-w-sm w-full mb-6">
        <Transition
          show={!!errorMsg}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </Transition>
      </div>
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        <div>
          <InputComponent
            type="password"
            label={t("Password")}
            placeholder={t("Enter a new password")}
            name="password"
            onChange={(event) => updateNewPasswordValue(event.target.value)}
            value={newPassword}
          />
          {renderErrorMessages && newPasswordFeedbackLog[0].error ? (
            <ValidationMessageComponent feedbackLog={newPasswordFeedbackLog} />
          ) : null}
        </div>
        <InputComponent
          type="password"
          label={t("Repeat password")}
          placeholder={t("Repeat your new password")}
          name="passwordRepeat"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
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
