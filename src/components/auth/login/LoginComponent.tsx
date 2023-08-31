import { useSecureContext } from "../../../hooks/secure-http-context";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { LinkComponent } from "../../shared/LinkComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { NblocksButton } from "../../shared/NblocksButton";
import { InputComponent } from "../../shared/InputComponent";
import { TextComponent } from "../../shared/TextComponent";
import { useConfig } from "../../../hooks/config-context";
import { FederationType, MfaState } from "../../../utils/AuthService";
import { AlertComponent } from "../../shared/AlertComponent";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { useApp } from "../../../hooks/app-context";
import { AzureAdSsoButtonComponent } from "../shared/AzureAdSsoButtonComponent";
import { GoogleSsoButtonComponent } from "../shared/GoogleSsoButtonComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
  startAuthentication,
  platformAuthenticatorIsAvailable,
} from "@simplewebauthn/browser";
import { PasskeysLoginButtonComponent } from "../shared/PasskeysLoginButtonComponent";
import { DividerComponent } from "../../shared/DividerComponent";

type ComponentProps = {
  didLogin: (mfa: MfaState, tenantUserId?: string) => void;
  didClickFederatedLogin: (type: FederationType) => void;
};

type CredentialsInputMode = "USERNAME" | "PASSWORD" | "RESET-PASSWORD";

const LoginComponent: FunctionComponent<ComponentProps> = ({
  didLogin,
  didClickFederatedLogin,
}) => {
  const { authService } = useSecureContext();
  const [username, setUsername] = useState("");
  const [credentialsInputMode, setCredentialsInputMode] =
    useState<CredentialsInputMode>("USERNAME");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { tenantSignup, authLegacy, demoSSO } = useConfig();
  const { azureAdSsoEnabled, googleSsoEnabled, passkeysEnabled } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const passkeysLogin = !authLegacy && passkeysEnabled;

  // Show SSO Login btn if we have it enabled or demoSSO is true
  const azureAdLogin = !authLegacy && (azureAdSsoEnabled || demoSSO);
  const googleLogin = !authLegacy && (googleSsoEnabled || demoSSO);

  useEffect(() => {
    if (passkeysLogin && browserSupportsWebAuthn()) {
      browserSupportsWebAuthnAutofill().then((support) => {
        if (support) {
          passkeysAuthenticate(true);
        }
      });
    }
  }, []);

  /**
   * Password manager plugins like 1Password can interfare with native browser webauthn autofill
   * @param autofill
   */
  const passkeysAuthenticate = async (autofill: boolean) => {
    if (!autofill) {
      setIsLoading(true);
    }

    try {
      const passkeysAuthOptions =
        await authService.passkeysAuthenticationOptions();

      if (passkeysAuthOptions) {
        const authResult = await startAuthentication(
          passkeysAuthOptions,
          autofill
        );

        setIsLoading(true);

        const { mfaState, tenantUserId } =
          await authService.passkeysAuthenticate(authResult);
        didLogin(mfaState, tenantUserId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      switch (credentialsInputMode) {
        case "USERNAME":
          await checkCredentialsConfig();
          break;

        case "PASSWORD":
          await loginWithPassword();
          break;

        case "RESET-PASSWORD":
          navigate(RouteConfig.password.resetPasswordScreen, {
            state: { username },
          });
          break;
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthenticatedError) {
        setIsLoading(false);
        setErrorMsg(t("Wrong credentials, please try again."));
      } else {
        setIsLoading(false);
        setErrorMsg(
          t(
            "There was an error when logging in. Try again, otherwise contact support."
          )
        );
      }
      setPassword("");
    }
  };

  const loginWithPassword = async () => {
    const { mfaState, tenantUserId } = await authService.authenticate(
      username,
      password
    );
    didLogin(mfaState, tenantUserId);
    setPassword("");
  };

  const checkCredentialsConfig = async () => {
    const { hasPassword } = await authService.getCredentialsConfig(username);
    if (hasPassword) {
      setCredentialsInputMode("PASSWORD");
    } else {
      setCredentialsInputMode("RESET-PASSWORD");
    }
  };

  const resetFlow = () => {
    setCredentialsInputMode("USERNAME");
    setUsername("");
    setPassword("");
    setErrorMsg("");
    setIsLoading(false);
  };

  const loginMiddleware = (type: FederationType) => {
    setIsLoading(true);
    didClickFederatedLogin(type);
  };

  const renderPasskeysLogin = () => {
    if (passkeysLogin) {
      return (
        <PasskeysLoginButtonComponent
          mode="login"
          onClick={() => passkeysAuthenticate(false)}
        ></PasskeysLoginButtonComponent>
      );
    }
  };

  const renderAzureAd = () => {
    if (azureAdLogin) {
      return (
        <AzureAdSsoButtonComponent
          mode="login"
          onClick={() => loginMiddleware("ms-azure-ad")}
        ></AzureAdSsoButtonComponent>
      );
    }
  };

  const renderGoogle = () => {
    if (googleLogin) {
      return (
        <GoogleSsoButtonComponent
          mode="login"
          onClick={() => loginMiddleware("google")}
        ></GoogleSsoButtonComponent>
      );
    }
  };

  const renderLoginAlternatives = () => {
    if (credentialsInputMode === "USERNAME") {
      const hasAlternative = passkeysLogin || googleLogin || azureAdLogin;
      return (
        <>
          {hasAlternative && (
            <div className="py-2">
              <DividerComponent text={t("Or")} />
            </div>
          )}
          <div className="space-y-2">
            {renderPasskeysLogin()}
            {renderGoogle()}
            {renderAzureAd()}
          </div>
        </>
      );
    }
  };

  const renderCredentialsInput = () => {
    switch (credentialsInputMode) {
      case "USERNAME":
        return (
          <InputComponent
            type="email"
            label={t("Email address")}
            placeholder={t("Enter your email")}
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            autoComplete="username webauthn"
            autoFocus={true}
          />
        );

      case "PASSWORD":
        return (
          <>
            <InputComponent
              type="password"
              label={t("Password")}
              placeholder={t("Enter your password")}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
            <div className="flex justify-end">
              <LinkComponent
                to={RouteConfig.password.resetPasswordScreen}
                handoverProps={{ username }}
                type="primary"
                size="sm"
                className="font-semibold"
              >
                {t("Forgot password")}
              </LinkComponent>
            </div>
          </>
        );

      case "RESET-PASSWORD":
        return <TextComponent>You need to reset your password</TextComponent>;
    }
  };

  const getSubmitButtonText = () => {
    switch (credentialsInputMode) {
      case "USERNAME":
        return t("Continue");

      case "PASSWORD":
        return t("Sign in");

      case "RESET-PASSWORD":
        return t("Set password");
    }
  };

  const getSubmitButtonDisabled = () => {
    switch (credentialsInputMode) {
      case "USERNAME":
        return !username;

      case "PASSWORD":
        return !username;

      case "RESET-PASSWORD":
        return false;
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        {renderCredentialsInput()}
        <div>
          <NblocksButton
            submit={true}
            disabled={getSubmitButtonDisabled()}
            size="md"
            type="primary"
            isLoading={isloading}
            fullWidth={true}
          >
            {getSubmitButtonText()}
          </NblocksButton>
        </div>
        {renderLoginAlternatives()}
      </form>
      {credentialsInputMode != "USERNAME" && (
        <div className="mt-8">
          <NblocksButton onClick={() => resetFlow()}>
            <LinkComponent
              to={"#"}
              size="sm"
              className="font-semibold flex items-center"
              type={"secondary"}
            >
              <ArrowLeftIcon className="w-5 inline-block mr-1" />{" "}
              {t("Try a different email")}
            </LinkComponent>
          </NblocksButton>
        </div>
      )}
      {tenantSignup && (
        <div className="mt-8">
          <TextComponent size="sm">
            {t("Don't have an account?")}&nbsp;
            <LinkComponent
              to={RouteConfig.tenant.signupScreen}
              type="primary"
              size="sm"
              className="font-semibold"
            >
              {t("Create one")}
            </LinkComponent>
          </TextComponent>
        </div>
      )}
    </>
  );
};

export { LoginComponent };
