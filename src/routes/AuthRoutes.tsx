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

//TODO this should be moved to a hook or somewhere more generic
const RouteConfig: NavigationConfig = {
  login: {
    loginScreen: "/auth/login",
    logoutScreen: "/auth/logout",
    chooseUserScreen: "/auth/choose-user",
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
    onboardUserScreen: "/onboard/user",
    onboardTenantScreen: "/onboard/tenant",
  },
  setup: {
    signupScreen: "/setup/signup",
    configScreen: "/setup/config",
  },
  tenant: {
    signupScreen: "/auth/signup",
    planScreen: "/tenant/plan",
    payment: "/tenant/payment",
    paymentCancel: "/tenant/payment/cancel",
    paymentSuccess: "/tenant/payment/success",
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
  return (
    <Routes>
      <Route path="login" element={<LoginScreen />}></Route>
      <Route path="logout" element={<LogoutScreen />}></Route>
      <Route path="reset-password" element={<ResetPasswordScreen />}></Route>
      <Route path="set-password/:token" element={<SetPasswordScreen />}></Route>
      <Route path="choose-user" element={<ChooseUserScreen />}></Route>
      <Route path="signup/:planName" element={<SignupScreen />}></Route>
      <Route path="signup/" element={<SignupScreen />}></Route>
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
