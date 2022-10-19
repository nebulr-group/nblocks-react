import {useAuth, useApp} from 'nblocks-react';
import {
  Link
} from "react-router-dom";

export function HomeScreen() {
  
  const {currentUser, logout } = useAuth();
  const app = useApp();

  return (
    <div>
      <div>
        <Link className="text-blue-600" to="/brandExpo" state={{ testVariable: true }}>Goto Brand Expo</Link>
      </div>
      <h1><pre>User: {JSON.stringify(currentUser, null, '\t')}</pre></h1>
      <h1><pre>App: {JSON.stringify(app, null, '\t')}</pre></h1>
      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}