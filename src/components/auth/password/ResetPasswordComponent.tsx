import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type ComponentProps = {
  didSendResetPasswordLink: () => void
}

const ResetPasswordComponent: FunctionComponent<ComponentProps> = ({didSendResetPasswordLink}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.sendResetPasswordLink("oscar@nebulr.group");
    didSendResetPasswordLink();
  }

  return (
    <div>
      <h1>ResetPasswordComponent</h1>
      <p>Clicking below will simulate requesting a forgot password email</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Request new password</button>
    </div>
  );
}

export {ResetPasswordComponent}