import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { usePasswordValidation } from "../../../hooks/usePasswordValidation";
import { ValidationMessageComponent } from "../../shared/ValidationMessageComponent";

type ComponentProps = {
  didSetPassword: () => void;
  resetToken: string;
};

const SetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSetPassword,
  resetToken,
}) => {
  const { authService } = useSecureContext();
  const {
    password: newPassword,
    feedbackLog: newPasswordFeedbackLog,
    passwordIsValid: newPasswordIsValid,
    onPasswordTextChangeValidation: onNewPasswordTextChangeValidation,
  } = usePasswordValidation();

  const { password: confirmPassword, setPassword: setConfirmPassword } =
    usePasswordValidation();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.updatePassword(resetToken, newPassword);
    didSetPassword();
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
      <form onSubmit={(event) => submit(event)} className="space-y-6">
        <div>
          <InputComponent
            type="password"
            label="Password"
            placeholder="Enter a new password"
            name="password"
            onChange={(event) =>
              onNewPasswordTextChangeValidation(event.target.value)
            }
            value={newPassword}
          />
          {renderErrorMessages && newPasswordFeedbackLog[0].error ? (
            <ValidationMessageComponent feedbackLog={newPasswordFeedbackLog} />
          ) : null}
        </div>
        <InputComponent
          type="password"
          label="Repeat password"
          placeholder="Repeat your new password"
          name="passwordRepeat"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
        />
        <div>
          <NblocksButton
            submit={true}
            size="md"
            type="primary"
            fullWidth={true}
            disabled={!formIsValid}
          >
            Reset password
          </NblocksButton>
        </div>
      </form>
      <div>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { SetPasswordComponent };
