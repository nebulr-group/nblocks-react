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
  const { signup } = useConfig();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await authService.authenticate(username, password);
      didLogin(response.mfaState);
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg("Wrong credentials, please try again.");
      } else {
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
        <AlertComponent
          type="danger"
          title="An error occured"
          messages={[errorMsg]}
        />
      )}
      <form onSubmit={(event) => submit(event)} className="space-y-6">
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
            fullWidth={true}
          >
            Signin
          </NblocksButton>
        </div>
      </form>
      {signup && (
        <div>
          <TextComponent size="sm">
            Don't have an account?&nbsp;
            <LinkComponent
              to={RouteConfig.setup.signup}
              type="primary"
              size="sm"
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
