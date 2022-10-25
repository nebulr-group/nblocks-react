import React from 'react'
import {useAuth, useApp, useConfig} from 'nblocks-react';
import {
  Link
} from "react-router-dom";

export function HomeScreen() {
  
  const {currentUser, logout } = useAuth();
  const app = useApp();
  const config = useConfig();

  document.title = "Home";

  return (
    <div>
      <div>
        <div>
          <Link className="text-blue-600" to="/setup">Goto setup</Link>
        </div>
        
        <Link className="text-blue-600" to="/brandExpo" state={{ testVariable: true }}>Goto Brand Expo</Link>
      </div>
      <h1><pre>User: {JSON.stringify(currentUser, null, '\t')}</pre></h1>
      <h1><pre>Lib config: {JSON.stringify(config, null, '\t')}</pre></h1>
      <h1><pre>App: {JSON.stringify(app, null, '\t')}</pre></h1>
      <div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}