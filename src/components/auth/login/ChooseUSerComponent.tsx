import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../../hooks/auth-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";

type ComponentProps = {
  didSelectUser: (user: AuthTenantUserResponseDto) => void
}

const ChooseUserComponent: FunctionComponent<ComponentProps> = ({didSelectUser}) => {

  const {switchUser } = useAuth();
  const {authService, didAuthenticate} = useSecureContext();

  const submit = async () => {
    const myIdentities = await authService.listUsers();
    const user = myIdentities[0];
    switchUser(user.id);
    didAuthenticate(true);
    didSelectUser(user);
  }

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Select user</button>
  )
}

export {ChooseUserComponent}