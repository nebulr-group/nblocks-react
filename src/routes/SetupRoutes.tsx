import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigScreen } from "../screens/setup/Config.screen";
import { SignupScreen } from "../screens/setup/Signup.screen";
import { AuthGuard } from "./AuthGuard";

const SetupRoutes = () => {
  return (
    <Routes>
      <Route
        path="config"
        element={
          <AuthGuard>
            <ConfigScreen />
          </AuthGuard>
        }
      ></Route>
      <Route path="signup/:planName" element={<SignupScreen />}></Route>
      <Route path="signup/" element={<SignupScreen />}></Route>
    </Routes>
  );
};

export { SetupRoutes };
