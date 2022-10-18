import {AuthRoutes, useAuth, NblocksProvider} from 'nblocks-react';
import React, { FunctionComponent, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import {HomeScreen} from './screens/HomeScreen';
import {BrandExpoScreen} from './screens/BrandExpoScreen';

function App() {
    const [state, setState] = useState("hello");
    return (
      <div className="App">
        <NblocksProvider config={{ debug: true }}>
          {/* <AppRoutes/> */}
        </NblocksProvider>
      </div>
    )
  }
  
  const AppRoutes: FunctionComponent<{}> = ({}) => {
      const {currentUser} = useAuth();
  
      if (currentUser.authenticated)
          return (
              <BrowserRouter>
                <Routes>
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/brandExpo" element={<BrandExpoScreen />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </BrowserRouter>
          );
      else
          return (
              <AuthRoutes></AuthRoutes>
          );
  }
  
  export default App;