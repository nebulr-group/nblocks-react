import { useAuth } from "../hooks/auth-context";
import { useSecureContext } from "../hooks/secure-http-context";

export function LoginScreen() {
  const {switchUser } = useAuth();
  const {authService, didAuthenticate} = useSecureContext();
  const login = async () => {
    await authService.authenticate("oscar@nebulr.group", "helloworld");
    const myIdentities = await authService.listUsers();
    switchUser(myIdentities[0].id);
    didAuthenticate(true);
  }

  return (
    <div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => login()}>Login</button>
      </div>
    </div>
  )
}