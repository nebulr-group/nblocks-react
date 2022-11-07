import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { LinkComponent } from "../../shared/LinkComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { NblocksButton } from "../../shared/NblocksButton";
import { InputComponent } from "../../shared/InputComponent";
import { TextComponent } from "../../shared/TextComponent";
import { useConfig } from "../../../hooks/config-context";
import { MfaState } from "../../../utils/AuthService";
import { AlertComponent } from "../../shared/AlertComponent";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";

type ComponentProps = {
  didLogin: (mfa: MfaState) => void;
};

const LoginComponent: FunctionComponent<ComponentProps> = ({ didLogin }) => {
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
      const response = await authService.authenticate(username, password);
      didLogin(response.mfaState);
      setIsLoading(false);
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
      setUsername("");
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
            to={RouteConfig.password.ResetPasswordScreen}
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
              to={RouteConfig.setup.signup}
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
