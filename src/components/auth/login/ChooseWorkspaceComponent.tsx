import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../../hooks/auth-context";

type ChooseWorkspaceComponentProps = {
  didSelectUser: () => void
}

const ChooseWorkspaceComponent: FunctionComponent<ChooseWorkspaceComponentProps> = ({didSelectUser}) => {

  const {switchUser } = useAuth();
  const {authService, didAuthenticate} = useSecureContext();

  const selectUser = async () => {
    const myIdentities = await authService.listUsers();
    switchUser(myIdentities[0].id);
    didAuthenticate(true);
    didSelectUser();
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => selectUser()}>Select user</button>
  )
}

export {ChooseWorkspaceComponent}