import React from "react";
import { LoginScreen } from "../screens/auth/login/Login.screen";
import { Routes, Route, Navigate } from "react-router-dom";
import { LogoutScreen } from "../screens/auth/login/Logout.screen";
import { ChooseUserScreen } from "../screens/auth/login/ChooseUser.screen";
import { ResetPasswordScreen } from "../screens/auth/password/ResetPassword.screen";
import { SetPasswordScreen } from "../screens/auth/password/SetPassword.screen";
import { RequireMfaScreen } from "../screens/auth/mfa/RequireMfa.screen";
import { RecoverMfaScreen } from "../screens/auth/mfa/RecoverMfa.screen";
import { SetupMfaScreen } from "../screens/auth/mfa/SetupMfa.screen";
import { NavigationConfig } from "../models/navigation-config";
import { SignupScreen } from "../screens/auth/Signup.screen";
import { useConfig } from "../hooks/config-context";
import { CallbackScreen } from "../screens/auth/oauth/Callback.screen";

//TODO this should be moved to a hook or somewhere more generic
const RouteConfig: NavigationConfig = {
  login: {
    loginScreen: "/auth/login",
    logoutScreen: "/auth/logout",
    chooseUserScreen: "/auth/choose-user",
    callbackScreen: "/auth/oauth-callback",
  },
  password: {
    resetPasswordScreen: "/auth/reset-password",
    setPasswordScreen: "/auth/set-password/",
  },
  mfa: {
    requireMfaScreen: "/auth/mfa/required",
    recoverMfaScreen: "/auth/mfa/recover",
    setupMfaScreen: "/auth/mfa/setup",
  },
  onboard: {
    onboardingStart: "/onboard",
    onboardUserScreen: "/onboard/user",
    onboardTenantScreen: "/onboard/tenant",
  },
  tenant: {
    signupScreen: "/auth/signup",
    planScreen: "/tenant/plan",
  },
  user: {
    list: "/user/list",
  },
};

/**
 * This is a combination of all the auth related routes Nblocks has to offer
 * @returns
 */
const AuthRoutes = () => {
  const { tenantSignup } = useConfig();
  return (
    <Routes>
      <Route path="login" element={<LoginScreen />}></Route>
      <Route path="logout" element={<LogoutScreen />}></Route>
      <Route path="reset-password" element={<ResetPasswordScreen />}></Route>
      <Route path="set-password/:token" element={<SetPasswordScreen />}></Route>
      <Route path="choose-user" element={<ChooseUserScreen />}></Route>
      <Route path="oauth-callback" element={<CallbackScreen />}></Route>
      {tenantSignup && (
        <Route path="signup/:planName" element={<SignupScreen />}></Route>
      )}
      {tenantSignup && (
        <Route path="signup/" element={<SignupScreen />}></Route>
      )}
      <Route path="mfa">
        <Route path="required" element={<RequireMfaScreen />}></Route>
        <Route path="recover" element={<RecoverMfaScreen />}></Route>
        <Route path="setup" element={<SetupMfaScreen />}></Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to={RouteConfig.login.loginScreen} replace={true} />}
      />
    </Routes>
  );
};

export { AuthRoutes, RouteConfig };
