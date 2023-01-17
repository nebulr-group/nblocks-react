import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { LinkComponent } from "../../shared/LinkComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { NblocksButton } from "../../shared/NblocksButton";
import { InputComponent } from "../../shared/InputComponent";
import { TextComponent } from "../../shared/TextComponent";
import { useConfig } from "../../../hooks/config-context";
import { AuthService, MfaState } from "../../../utils/AuthService";
import { AlertComponent } from "../../shared/AlertComponent";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { OAuthService } from "../../../utils/OAuthService";

type OauthProps = {
  clientId: string;
  scope: string;
  redirectUri: string;
  responseType: string;
  state?: string | null;
};

type ComponentProps = {
  oauthProps?: OauthProps;
  didLogin: (mfa: MfaState) => void;
};

const LoginComponent: FunctionComponent<ComponentProps> = ({
  didLogin,
  oauthProps,
}) => {
  const { authService } = useSecureContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const { signup } = useConfig();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!!oauthProps && authService instanceof OAuthService) {
        await authService.authorizeUser(
          username,
          password,
          oauthProps.scope,
          oauthProps.clientId,
          oauthProps.redirectUri,
          oauthProps.responseType
        );
        setIsLoading(false);
        didLogin("DISABLED");
      }

      if (authService instanceof AuthService) {
        const response = await authService.authenticate(username, password);
        setIsLoading(false);
        didLogin(response.mfaState);
      }
    } catch (error) {
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
      </form>
      {signup && (
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
export type { OauthProps };
