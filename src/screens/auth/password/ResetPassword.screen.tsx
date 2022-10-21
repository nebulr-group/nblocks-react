import React, { FunctionComponent } from "react";
import { ResetPasswordComponent } from "../../../components/auth/password/ResetPasswordComponent";

const ResetPasswordScreen: FunctionComponent<{}> = () => {

  const onDidSendResetPasswordLink = () => {
    alert("A password link has been sent")
  }

  return (
    <ResetPasswordComponent didSendResetPasswordLink={() => onDidSendResetPasswordLink()}/>
  )
};

export { ResetPasswordScreen };
