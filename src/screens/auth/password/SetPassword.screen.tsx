import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { SetPasswordComponent } from "../../../components/auth/password/SetPasswordComponent";

const SetPasswordScreen: FunctionComponent = () => {
  const params = useParams();
  const resetToken = params.token!;

  const onDidSetPassword = () => {
    alert("Use new password from now on, goto login screen");
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Forgot password?"}
      subHeading={"No worries, we'll send you reset instructions."}
    >
      <SetPasswordComponent
        didSetPassword={() => onDidSetPassword()}
        resetToken={resetToken}
      />
    </AuthLayoutWrapperComponent>
  );
};

export { SetPasswordScreen };
