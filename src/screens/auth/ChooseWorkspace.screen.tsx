import React from "react";
import { useAuth } from "../../hooks/auth-context";
import { useSecureContext } from "../../hooks/secure-http-context";

export function ChooseWorkspaceScreen() {

  const {switchUser } = useAuth();
  const {authService, didAuthenticate} = useSecureContext();
  
  const selectUser = async () => {
    const myIdentities = await authService.listUsers();
    switchUser(myIdentities[0].id);
    didAuthenticate(true);
  }

  return (
    <>
        {/* <ChooseWorkspaceComponent didSelectWorkspace={} /> */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => selectUser()}>Select user</button>
        </div>
    </>
  )
}