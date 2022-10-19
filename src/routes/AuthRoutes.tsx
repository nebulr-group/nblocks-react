import React from "react";
import { LoginScreen } from "../screens/auth/Login.screen";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import { LogoutScreen } from "../screens/auth/Logout.screen";
import { ChooseWorkspaceScreen } from "../screens/auth/ChooseWorkspace.screen";
import { ResetPasswordScreen } from "../screens/auth/password/ResetPasswordScreen";
import { SetPasswordScreen } from "../screens/auth/password/SetPasswordScreen";
import { RequireMfaScreen } from "../screens/auth/mfa/RequireMfaScreen";
import { ResetMfaScreen } from "../screens/auth/mfa/ResetMfaScreen";
import { SetupMfaScreen } from "../screens/auth/mfa/SetupMfaScreen";

const AuthRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="login" element={<LoginScreen />}></Route>
          <Route path="logout" element={<LogoutScreen />}></Route>
          <Route path="resetPassword" element={<ResetPasswordScreen />}></Route>
          <Route path="setPassword" element={<SetPasswordScreen />}></Route>
          <Route path="mfa">
            <Route path="required" element={<RequireMfaScreen />}></Route>
            <Route path="recover" element={<ResetMfaScreen />}></Route>
            <Route path="setup" element={<SetupMfaScreen />}></Route>
          </Route>
          <Route path="chooseWorkspace" element={<ChooseWorkspaceScreen />}></Route>
          <Route path="" element={<Navigate to="/auth/login" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AuthRoutes };
