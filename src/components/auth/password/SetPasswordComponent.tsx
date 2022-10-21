import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type SetPasswordComponentProps = {
  didSetPassword: () => void;
  resetToken: string;
}

const SetPasswordComponent: FunctionComponent<SetPasswordComponentProps> = ({didSetPassword, resetToken}) => {

  const {authService} = useSecureContext();

  const setPassword = async () => {
    await authService.updatePassword(resetToken, "helloworld");
    didSetPassword();
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPassword()}>Change to helloworld</button>
  )
}

export {SetPasswordComponent}