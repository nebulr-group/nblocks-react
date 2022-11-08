import React, { FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { SetPasswordComponent } from "../../../components/auth/password/SetPasswordComponent";
import { SetPasswordSuccessComponent } from "../../../components/auth/password/SetPasswordSuccessComponent";

const SetPasswordScreen: FunctionComponent = () => {
  const params = useParams();
  const resetToken = params.token!;

  const [passwordReset, setPasswordReset] = useState(false);

  const onDidSetPassword = () => {
    setPasswordReset(true);
  };

  const renderChild = () => {
    if (passwordReset) {
      return <SetPasswordSuccessComponent />;
    } else {
      return (
        <SetPasswordComponent
          didSetPassword={() => onDidSetPassword()}
          resetToken={resetToken}
        />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={passwordReset ? "Password reset" : "Set new password"}
      subHeading={
        passwordReset
          ? "Your new password has been successfully set. Click below to log in."
          : "Set a password to use when you sign in."
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SetPasswordScreen };
