import axios from "axios";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { useConfig } from "../../hooks/config-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { AlertComponent } from "../shared/AlertComponent";
import { InputComponent } from "../shared/InputComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { TextComponent } from "../shared/TextComponent";

type CreateAppResponse = {
  apiKey: string;
  app: Record<string, unknown> & { id: string };
};

type ComponentProps = {
  didSignup: (data: CreateAppResponse) => void;
};

const SignupComponent: FunctionComponent<ComponentProps> = ({ didSignup }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { accountApiBaseUri } = useConfig();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post<CreateAppResponse>(
        `${accountApiBaseUri}/nblocks/testApp`,
        {
          name,
          email,
        }
      );
      didSignup(response.data);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        "There was an error when creating the app. Try again, otherwise contact support."
      );
      setIsLoading(false);
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
          type="text"
          label="Name*"
          placeholder="Give your app a name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <InputComponent
          type="email"
          label="Email address*"
          placeholder="Enter your email"
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!email || !name}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            Create app
          </NblocksButton>
        </div>
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { SignupComponent };
export type { CreateAppResponse };
