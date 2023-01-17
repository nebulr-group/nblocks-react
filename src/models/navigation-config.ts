export interface NavigationConfig {
  login: {
    loginScreen: string;
    logoutScreen: string;
    chooseUserScreen: string;
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
    onboardUserScreen: string;
    onboardTenantScreen: string;
  };
  setup: {
    signupScreen: string;
    configScreen: string;
  };
  tenant: {
    signupScreen: string;
    planScreen: string;
    payment: string;
    paymentCancel: string;
    paymentSuccess: string;
  };
  user: {
    list: string;
  };
}
