import React, { FunctionComponent } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ResetPasswordComponent } from "../../../components/auth/password/ResetPasswordComponent";

const ResetPasswordScreen: FunctionComponent<{}> = () => {
  const onDidSendResetPasswordLink = () => {
    alert("A password link has been sent, check your inbox");
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Forgot password?"}
      subHeading={"No worries, we'll send you reset instructions."}
    >
      <ResetPasswordComponent
        didSendResetPasswordLink={() => onDidSendResetPasswordLink()}
      />
    </AuthLayoutWrapperComponent>
  );
};

export { ResetPasswordScreen };
