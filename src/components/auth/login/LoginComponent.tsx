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
import { FederationType, MfaState } from "../../../utils/AuthService";
import { AlertComponent } from "../../shared/AlertComponent";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { startAuthentication } from "@simplewebauthn/browser";
import { FederationConnection } from "../../../utils/OAuthService";
import { LoginAlternativesComponent } from "./LoginAlternativesComponent";
import { FederationConnectionsComponent } from "./FederationConnectionsComponent";
import { useApp } from "../../../hooks/app-context";

type ComponentProps = {
  initalError?: boolean;
  errorDetails?: null | undefined | "mle";
  didLogin: (mfa: MfaState, tenantUserId?: string) => void;
  didClickFederatedLogin: (type: FederationType) => void;
  didClickFederationConnection: (connection: FederationConnection) => void;
};

type CredentialsInputMode =
  | "USERNAME"
  | "PASSWORD"
  | "FEDERATION-CONNECTIONS"
  | "RESET-PASSWORD";

const LoginComponent: FunctionComponent<ComponentProps> = ({
  initalError,
  errorDetails,
  didLogin,
  didClickFederatedLogin,
  didClickFederationConnection,
}) => {
  const { authService } = useSecureContext();
  const [username, setUsername] = useState("");
  const [credentialsInputMode, setCredentialsInputMode] =
    useState<CredentialsInputMode>("USERNAME");
  const [federationConnections, setFederationConnections] = useState<
    FederationConnection[]
  >([]);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { tenantSelfSignup } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const wrongCredentialsErrorMsg = t("Wrong credentials, please try again.");
  const generalErrorMsg = t(
    "There was an error when logging in. Try again, otherwise contact support."
  );
  const initialErrorMsg = t(
    "There was an error when logging in. Are you sure you already have signed up for an account?"
  );

  const magicLinkExpiredErrorMsg = t(
    "The magic link has expired, or you're not using the same browser that you sent the link from."
  );

  useEffect(() => {
    if (initalError) {
      if (errorDetails === "mle") setErrorMsg(magicLinkExpiredErrorMsg);
      else setErrorMsg(initialErrorMsg);
    }
  }, [initalError]);

  /**
   * Password manager plugins like 1Password can interfare with native browser webauthn autofill
   * @param autofill
   */
  const onDidPasskeysAuthenticate = async (autofill: boolean) => {
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
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg(wrongCredentialsErrorMsg);
      } else {
        setErrorMsg(generalErrorMsg);
      }
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPassword = async () => {
    const { mfaState, tenantUserId } = await authService.authenticate(
      username,
      password
    );
    didLogin(mfaState, tenantUserId);
  };

  const checkCredentialsConfig = async () => {
    const { hasPassword, federationConnections } =
      await authService.getCredentialsConfig(username);
    if (federationConnections.length > 0) {
      setFederationConnections(federationConnections);
      setCredentialsInputMode("FEDERATION-CONNECTIONS");
    } else {
      if (hasPassword) {
        setCredentialsInputMode("PASSWORD");
      } else {
        setCredentialsInputMode("RESET-PASSWORD");
      }
    }
  };

  const resetFlow = () => {
    setCredentialsInputMode("USERNAME");
    setUsername("");
    setPassword("");
    setErrorMsg("");
    setIsLoading(false);
  };

  const ssoLoginMiddleware = (type: FederationType) => {
    didClickFederatedLogin(type);
  };

  const didClickMagicLink = () => {
    navigate(RouteConfig.login.magicLinkScreen, {
      state: { username },
    });
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
            title={t("Could not login")}
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        {renderCredentialsInput()}
        {credentialsInputMode !== "FEDERATION-CONNECTIONS" && (
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
        )}
        {credentialsInputMode === "USERNAME" && (
          <LoginAlternativesComponent
            didClickMagicLinkAuthenticate={didClickMagicLink}
            didClickPasskeysAuthenticate={onDidPasskeysAuthenticate}
            didClickSocialLogin={ssoLoginMiddleware}
          />
        )}
        {credentialsInputMode === "FEDERATION-CONNECTIONS" && (
          <FederationConnectionsComponent
            connections={federationConnections}
            didClickConnection={didClickFederationConnection}
          />
        )}
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
      {tenantSelfSignup && (
        <div className="mt-8">
          <TextComponent size="sm">
            {t("Don't have an account?")}&nbsp;
            <LinkComponent
              to={RouteConfig.tenant.signupScreen}
              type="primary"
              size="sm"
              className="font-semibold"
            >
              {t("Sign up")}
            </LinkComponent>
          </TextComponent>
        </div>
      )}
    </>
  );
};

export { LoginComponent };
