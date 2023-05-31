import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
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

type ComponentProps = {
  didLogin: (mfa: MfaState, tenantUserId?: string) => void;
  didClickFederatedLogin: (type: FederationType) => void;
};

const LoginComponent: FunctionComponent<ComponentProps> = ({
  didLogin,
  didClickFederatedLogin,
}) => {
  const { authService } = useSecureContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { tenantSignup, authLegacy, demoSSO } = useConfig();
  const { azureAdSsoEnabled, googleSsoEnabled } = useApp();

  // Show SSO Login btn if we have it enabled or demoSSO is true
  const azureAdLogin = !authLegacy && (azureAdSsoEnabled || demoSSO);
  const googleLogin = !authLegacy && (googleSsoEnabled || demoSSO);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { mfaState, tenantUserId } = await authService.authenticate(
        username,
        password
      );
      setIsLoading(false);
      didLogin(mfaState, tenantUserId);
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthenticatedError) {
        setIsLoading(false);
        setErrorMsg("Wrong credentials, please try again.");
      } else {
        setIsLoading(false);
        setErrorMsg(
          "There was an error when logging in. Try again, otherwise contact support."
        );
      }
      setPassword("");
    }
  };

  const loginMiddleware = (type: FederationType) => {
    setIsLoading(true);
    didClickFederatedLogin(type);
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

  const renderSso = () => {
    if (azureAdLogin) {
      return (
        <div className="space-y-2">
          {renderGoogle()}
          {renderAzureAd()}
        </div>
      );
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title="An error occured"
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        <InputComponent
          type="email"
          label="Email address"
          placeholder="Enter your email"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
        <InputComponent
          type="password"
          label="Password"
          placeholder="Enter your password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <div className="flex justify-end">
          <LinkComponent
            to={RouteConfig.password.resetPasswordScreen}
            type="primary"
            size="sm"
            className="font-semibold"
          >
            Forgot password
          </LinkComponent>
        </div>
        <div>
          <NblocksButton
            submit={true}
            disabled={!username || !password}
            size="md"
            type="primary"
            isLoading={isloading}
            fullWidth={true}
          >
            Sign in
          </NblocksButton>
        </div>
        {renderSso()}
      </form>
      {tenantSignup && (
        <div className="mt-8">
          <TextComponent size="sm">
            Don't have an account?&nbsp;
            <LinkComponent
              to={RouteConfig.tenant.signupScreen}
              type="primary"
              size="sm"
              className="font-semibold"
            >
              Create one
            </LinkComponent>
          </TextComponent>
        </div>
      )}
    </>
  );
};

export { LoginComponent };
