export interface NavigationConfig {
    login: {
        LoginScreen: string;
        LogoutScreen: string;
        ChooseUserScreen: string;
    };

    password: {
        ResetPasswordScreen: string;
        SetPasswordScreen: string;
    },
    mfa : {
        'RequireMfaScreen': string;
        'RecoverMfaScreen':  string;
        'SetupMfaScreen':  string;
    },
    onboard: {
        OnboardUserScreen: string;
        OnboardTenantScreen: string;
    }
}