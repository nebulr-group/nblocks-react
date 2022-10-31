import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  didSendResetPasswordLink: () => void;
};

const ResetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSendResetPasswordLink,
}) => {
  const { authService } = useSecureContext();
  const [email, setEmail] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.sendResetPasswordLink(email);
    didSendResetPasswordLink();
  };

  return (
    <>
      <form onSubmit={(event) => submit(event)} className="space-y-6">
        <InputComponent
          type="email"
          label="Email address"
          placeholder="Enter your email"
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!email}
            size="md"
            type="primary"
            fullWidth={true}
          >
            Reset password
          </NblocksButton>
        </div>
      </form>
      <div>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { ResetPasswordComponent };
