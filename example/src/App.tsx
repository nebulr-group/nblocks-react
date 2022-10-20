import {AuthRoutes, SetupRoutes, UserRoutes, NblocksProvider, AuthGuard} from 'nblocks-react';
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
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
  
  function AppRoutes() {
    return (
        <BrowserRouter>
          <NestedRoutes/>
        </BrowserRouter>
    );
  }

  function NestedRoutes() {
    return (
      <Routes>
        <Route path="/home" element={<AuthGuard><HomeScreen /></AuthGuard>} />
        <Route path="/brandExpo" element={<AuthGuard><BrandExpoScreen /></AuthGuard>} />
        <Route path="/auth/*" element={<AuthRoutes/>} />
        <Route path="/setup/*" element={<SetupRoutes/>} />
        <Route path="/user/*" element={<AuthGuard><UserRoutes/></AuthGuard>} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    )  
  }
  
  export default App;