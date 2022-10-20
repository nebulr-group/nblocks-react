import {
  AuthRoutes,
  SetupRoutes,
  useAuth,
  NblocksProvider,
} from "nblocks-react";
import React, { Fragment } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { HomeScreen } from "./screens/Home.screen";
import { BrandExpoScreen } from "./screens/BrandExpo.screen";

function App() {
  return (
    <Fragment>
      <NblocksProvider config={{ debug: true }}>
        <AppRoutes />
      </NblocksProvider>
    </Fragment>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/brandExpo" element={<BrandExpoScreen />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// function AppRoutes() {
//     const {currentUser} = useAuth();

//     if (currentUser.authenticated)
//         return (
//             <BrowserRouter>
//               <Routes>
//                 <Route path="/home" element={<HomeScreen />} />
//                 <Route path="/brandExpo" element={<BrandExpoScreen />} />
//                 <Route path="*" element={<Navigate to="/home" replace />} />
//                 {/* <SetupRoutes /> */}
//               </Routes>
//             </BrowserRouter>
//         );
//     else
//         return (
//             <AuthRoutes></AuthRoutes>
//         );
// }

export default App;
