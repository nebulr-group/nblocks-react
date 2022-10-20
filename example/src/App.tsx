import {AuthRoutes, SetupRoutes, AuthBrowser, useAuth, NblocksProvider} from 'nblocks-react';
import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import {HomeScreen} from './screens/Home.screen';
import {BrandExpoScreen} from './screens/BrandExpo.screen';

function App() {
    return (
      <div className="App">
        <NblocksProvider config={{ debug: true }}>
          <AppRoutes/>
        </NblocksProvider>
      </div>
    )
  }

  // function AppRoutes() {
  //       return (
  //           <BrowserRouter>
  //             <Routes>
  //               <Route path="/home" element={<HomeScreen />} />
  //               <Route path="/brandExpo" element={<BrandExpoScreen />} />
  //               <Route path="*" element={<Navigate to="/home" replace />} />
  //             </Routes>
  //           </BrowserRouter>
  //       );
  // }
  
  function AppRoutes() {
      //const {currentUser} = useAuth();
  
      const [currentUser] = useState({authenticated: true});

      if (currentUser.authenticated)
          return (
              <BrowserRouter>
                <OtherNestedRoutes/>
                <NestedRoutes/>
              </BrowserRouter>
          );
      else
          return (
              <AuthBrowser></AuthBrowser>
          );
  }

  function NestedRoutes() {
    return (
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/brandExpo" element={<BrandExpoScreen />} />
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
      </Routes>
    )  
  }

  function OtherNestedRoutes() {
    return (
      <Routes>
        <Route path="setup" element={<BrandExpoScreen />} />
      </Routes>
    )  
  }
  
  export default App;