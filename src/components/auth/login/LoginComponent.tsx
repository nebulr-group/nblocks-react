import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type LoginComponentProps = {
  didLogin: () => void
}

const LoginComponent: FunctionComponent<LoginComponentProps> = ({didLogin}) => {

  const {authService} = useSecureContext();

  const login = async () => {
    await authService.authenticate("oscar@nebulr.group", "helloworld");
    didLogin();
  }

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => login()}>Login</button>
    </div>
  )
}

export {LoginComponent}