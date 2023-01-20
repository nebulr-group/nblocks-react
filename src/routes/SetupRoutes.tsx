import React from "react";
import { Route, Routes } from "react-router-dom";
import { useConfig } from "../hooks/config-context";
import { ConfigScreen } from "../screens/setup/Config.screen";
import { SignupScreen } from "../screens/setup/Signup.screen";
import { NBAuthGuard } from "./AuthGuard";

const SetupRoutes = () => {
  const { appSignup } = useConfig();
  return (
    <Routes>
      <Route
        path="config"
        element={
          <NBAuthGuard>
            <ConfigScreen />
          </NBAuthGuard>
        }
      ></Route>
      {appSignup && <Route path="signup/" element={<SignupScreen />}></Route>}
    </Routes>
  );
};

export { SetupRoutes };
