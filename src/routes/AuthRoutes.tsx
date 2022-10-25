import React from "react";
import { LoginScreen } from "../screens/auth/login/Login.screen";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LogoutScreen } from "../screens/auth/login/Logout.screen";
import { ChooseUserScreen } from "../screens/auth/login/ChooseUser.screen";
import { ResetPasswordScreen } from "../screens/auth/password/ResetPassword.screen";
import { SetPasswordScreen } from "../screens/auth/password/SetPassword.screen";
import { RequireMfaScreen } from "../screens/auth/mfa/RequireMfa.screen";
import { RecoverMfaScreen } from "../screens/auth/mfa/RecoverMfa.screen";
import { SetupMfaScreen } from "../screens/auth/mfa/SetupMfa.screen";
import { NavigationConfig } from "../models/navigation-config";

//TODO this should be moved to a hook or somewhere more generic
const RouteConfig: NavigationConfig = {
  login: {
    LoginScreen: "/auth/login",
    LogoutScreen: "/auth/logout",
    ChooseUserScreen: "/auth/choose-user"
  },
  password: {
    ResetPasswordScreen: "/auth/reset-password",
    SetPasswordScreen: "/auth/set-password/",
  },
  mfa : {
    'RequireMfaScreen': "/auth/mfa/required",
    'RecoverMfaScreen':  "/auth/mfa/recover",
    'SetupMfaScreen':  "/auth/mfa/setup",
  },
  onboard: {
    OnboardUserScreen: "/onboard/user",
    OnboardTenantScreen: "/onboard/tenant"
  }
}

const AuthRoutes = () => {

  return (
    <Routes>
      <Route path="login" element={<LoginScreen />}></Route>
      <Route path="logout" element={<LogoutScreen />}></Route>
      <Route path="reset-password" element={<ResetPasswordScreen />}></Route>
      <Route path="set-password/:token" element={<SetPasswordScreen />}></Route>
      <Route path="choose-user" element={<ChooseUserScreen />}></Route>
      <Route path="mfa">
        <Route path="required" element={<RequireMfaScreen />}></Route>
        <Route path="recover" element={<RecoverMfaScreen />}></Route>
        <Route path="setup" element={<SetupMfaScreen />}></Route>
      </Route>
      <Route path="*" element={<Navigate to={RouteConfig.login.LoginScreen} replace />} />
    </Routes>
  );
};

export { AuthRoutes, RouteConfig };
