import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { AlertComponent } from "../../shared/AlertComponent";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  didSendResetPasswordLink: (email: string) => void;
};

const ResetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSendResetPasswordLink,
}) => {
  const { authService } = useSecureContext();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await authService.sendResetPasswordLink(email);
      didSendResetPasswordLink(email);
    } catch (error) {
      setErrorMsg(
        "There was an error when resetting the password. Try again, otherwise contact support."
      );
      setEmail("");
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
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold flex items-center"
        >
          <ArrowLeftIcon className="w-5 inline-block mr-1" /> Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { ResetPasswordComponent };
