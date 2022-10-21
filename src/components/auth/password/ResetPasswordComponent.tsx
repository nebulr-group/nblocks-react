import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type ResetPasswordComponentProps = {
  didSendResetPasswordLink: () => void
}

const ResetPasswordComponent: FunctionComponent<ResetPasswordComponentProps> = ({didSendResetPasswordLink}) => {

  const {authService} = useSecureContext();

  const sendResetPasswordLink = async () => {
    await authService.sendResetPasswordLink("oscar@nebulr.group");
    didSendResetPasswordLink();
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => sendResetPasswordLink()}>Request new password</button>
  )
}

export {ResetPasswordComponent}