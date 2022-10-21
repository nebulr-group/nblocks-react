import React from "react";
import { LoginScreen } from "../screens/auth/login/Login.screen";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LogoutScreen } from "../screens/auth/login/Logout.screen";
import { ChooseWorkspaceScreen } from "../screens/auth/login/ChooseWorkspace.screen";
import { ResetPasswordScreen } from "../screens/auth/password/ResetPassword.screen";
import { SetPasswordScreen } from "../screens/auth/password/SetPassword.screen";
import { RequireMfaScreen } from "../screens/auth/mfa/RequireMfa.screen";
import { ResetMfaScreen } from "../screens/auth/mfa/ResetMfa.screen";
import { SetupMfaScreen } from "../screens/auth/mfa/SetupMfa.screen";

const AuthRoutes = () => {

  return (
    <Routes>
      <Route path="login" element={<LoginScreen />}></Route>
      <Route path="logout" element={<LogoutScreen />}></Route>
      <Route path="reset-password" element={<ResetPasswordScreen />}></Route>
      <Route path="set-password/:token" element={<SetPasswordScreen />}></Route>
      <Route path="mfa">
        <Route path="required" element={<RequireMfaScreen />}></Route>
        <Route path="recover" element={<ResetMfaScreen />}></Route>
        <Route path="setup" element={<SetupMfaScreen />}></Route>
      </Route>
      <Route path="choose-workspace" element={<ChooseWorkspaceScreen />}></Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export { AuthRoutes };
