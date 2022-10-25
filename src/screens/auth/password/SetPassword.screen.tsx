import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { SetPasswordComponent } from "../../../components/auth/password/SetPasswordComponent";

const SetPasswordScreen: FunctionComponent = () => {

  const params = useParams();
  const resetToken = params.token!;

  const onDidSetPassword = () => {
    alert("Use new password from now on, goto login screen");
  }

  return (
    <SetPasswordComponent didSetPassword={() => onDidSetPassword()} resetToken={resetToken} />
  )
};

export { SetPasswordScreen };
