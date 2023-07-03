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
  const { passwordValidation, passwordComplexityRegex } = useConfig();
  const { t } = useTranslation();

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

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
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
