import { RouteConfig } from "../routes/AuthRoutes";
import { MfaState } from "../utils/AuthService";
import { useConfig } from "./config-context";
import { useSecureContext } from "./secure-http-context";
import { useLog } from "./use-log";
import { useRedirect } from "./use-redirect";

/** Must be within NblocksProvider ctx */
const useLogin = () => {
  const { authService } = useSecureContext();
  const { authLegacy } = useConfig();
  const { navigate, replace } = useRedirect();
  const { log } = useLog();

  // Callback when the signup, set-password, login resulted in a login
  const handleDidLogin = async (mfa: MfaState, tenantUserId?: string) => {
    switch (mfa) {
      case "REQUIRED":
        log("Navigating to Require MFA screen");
        navigate(RouteConfig.mfa.requireMfaScreen);
        break;

      case "SETUP":
        log("Navigating to Setup MFA screen");
        navigate(RouteConfig.mfa.setupMfaScreen);
        break;

      case "DISABLED":
      default:
        if (!authLegacy && tenantUserId) {
          replace(authService.getHandoverUrl(tenantUserId)!);
        } else {
          log("Navigating to Choose user screen");
          navigate(RouteConfig.login.chooseUserScreen);
        }

        break;
    }
  };

  return {
    handleDidLogin,
  };
};

export { useLogin };
