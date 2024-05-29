import React, { FunctionComponent, useEffect } from "react";
import { InputComponent } from "../../shared/InputComponent";
import { usePasswordValidation } from "../../../hooks/use-password-validation";
import { ValidationMessageComponent } from "../../shared/ValidationMessageComponent";
import { useConfig } from "../../../hooks/config-context";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  didProvideValidPassword: (password: string) => void;
  submitError?: boolean;
};

const PasswordInputComponent: FunctionComponent<ComponentProps> = ({
  didProvideValidPassword,
  submitError,
}) => {
  const { passwordValidation, passwordComplexityRegex } = useConfig();
  const { t } = useTranslation();

  useEffect(() => {
    onNewPasswordTextChangeValidation("");
    setConfirmPassword("");
  }, [submitError]);

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

  const samePasswordValidator = (
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (
      newPasswordIsValid &&
      samePasswordValidator(newPassword, confirmPassword)
    ) {
      didProvideValidPassword(newPassword);
    }
  }, [confirmPassword]);

  const renderErrorMessages = !newPasswordIsValid && !!newPassword;

  return (
    <>
      <div>
        <InputComponent
          type="password"
          label={t("Password*")}
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
        label={t("Repeat password*")}
        placeholder={t("Repeat your new password")}
        name="passwordRepeat"
        onChange={(event) => setConfirmPassword(event.target.value)}
        value={confirmPassword}
      />
    </>
  );
};

export { PasswordInputComponent };
