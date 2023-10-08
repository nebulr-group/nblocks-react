export interface NavigationConfig {
  login: {
    loginScreen: string;
    logoutScreen: string;
    chooseUserScreen: string;
    callbackScreen: string;
  };
  password: {
    resetPasswordScreen: string;
    setPasswordScreen: string;
  };
  mfa: {
    requireMfaScreen: string;
    recoverMfaScreen: string;
    setupMfaScreen: string;
  };
  onboard: {
    onboardingStart: string;
    onboardUserScreen: string;
    onboardTenantScreen: string;
  };
  tenant: {
    signupScreen: string;
    planScreen: string;
    paymentCancel: string;
    paymentSuccess: string;
  };
  user: {
    list: string;
  };
}
