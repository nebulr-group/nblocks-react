import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type ComponentProps = {
  didSetPassword: () => void;
  resetToken: string;
}

const SetPasswordComponent: FunctionComponent<ComponentProps> = ({didSetPassword, resetToken}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.updatePassword(resetToken, "helloworld");
    didSetPassword();
  }

  return (
    <div>
      <h1>SetPasswordComponent</h1>
      <p>Clicking below will set a new password</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Set password to helloworld</button>
    </div>
  )
}

export {SetPasswordComponent}