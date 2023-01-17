import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";
import {
  LoginComponent,
  OauthProps,
} from "../../../components/auth/login/LoginComponent";
import { useConfig } from "../../../hooks/config-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { MfaState } from "../../../utils/AuthService";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { OAuthService } from "../../../utils/OAuthService";

export function LoginScreen() {
  document.title = "Login";

  const { debug, handoverRoute, authLegacy } = useConfig();
  const { authService, didAuthenticate } = useSecureContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, switchUser } = useAuth();
  const [searchParams] = useSearchParams();

  // Target url when authentication finished
  const targetUrl = location.state?.from?.pathname || handoverRoute;

  useEffect(() => {
    if (currentUser.authenticated) {
      logout();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!authLegacy && !getOauthProps()) {
      log("We should use the Oauth flow");
      const oauthUrl = (authService as OAuthService).getAuthorizeUrl();
      window.location.replace(oauthUrl);
    }
  }, []);

  // Callback when the LoginComponent completed login
  const onDidLogin = async (mfa: MfaState) => {
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
        if (authLegacy) {
          log("Navigating to Choose user screen");
          navigate(RouteConfig.login.chooseUserScreen);
        } else {
          //TODO this is to simulate what ChooseUserScreen does.
          //When figuring out how to work with MFA and multi tenancy, this should be removed
          await switchUser((authService as OAuthService).currentUserId()!);
          didAuthenticate(true);
          log("Navigating to targetUrl");
          navigate(targetUrl);
        }
        break;
    }
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(msg);
    }
  };

  const getOauthProps = (): OauthProps | undefined => {
    if (searchParams.get("scope")) {
      log("Url contains OAuth parameters");
      return {
        clientId: searchParams.get("client_id")!,
        redirectUri: searchParams.get("redirect_uri")!,
        responseType: searchParams.get("response_type")!,
        scope: searchParams.get("scope")!,
        state: searchParams.get("scope"),
      };
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Log in to your account"}
      subHeading={"Welcome back! Please enter your details."}
    >
      <LoginComponent
        didLogin={(mfa) => onDidLogin(mfa)}
        oauthProps={getOauthProps()}
      />
    </AuthLayoutWrapperComponent>
  );
}
