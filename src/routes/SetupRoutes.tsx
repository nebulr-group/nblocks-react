import React from "react";
import {
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigScreen } from "../screens/setup/Config.screen";
import { SignupScreen } from "../screens/setup/Signup.screen";

const SetupRoutes = () => {

  return (
    <Route path="setup">
      <Route path="config" element={<ConfigScreen />}></Route>
      <Route path="signup" element={<SignupScreen />}></Route>
      <Route path="" element={<Navigate to="/setup/config" replace />} />
    </Route>
  );
};

export { SetupRoutes };
