import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { LinkComponent } from "../../shared/LinkComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { NblocksButton } from "../../shared/NblocksButton";
import { InputComponent } from "../../shared/InputComponent";
import { TextComponent } from "../../shared/TextComponent";
import { useConfig } from "../../../hooks/config-context";

type ComponentProps = {
  didLogin: () => void;
};

const LoginComponent: FunctionComponent<ComponentProps> = ({ didLogin }) => {
  const { authService } = useSecureContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useConfig();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.authenticate(username, password);
    didLogin();
  };

  return (
    <>
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
