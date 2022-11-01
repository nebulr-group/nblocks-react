import { useMutation } from "@apollo/client";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { CreateTenantAnonymousDocument } from "../../gql/graphql";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { AlertComponent } from "../shared/AlertComponent";
import { InputComponent } from "../shared/InputComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { TextComponent } from "../shared/TextComponent";

type ComponentProps = {
  didSignup: (email: string) => void;
};

const SignupComponent: FunctionComponent<ComponentProps> = ({ didSignup }) => {
  const [createTenantAnonymous, { loading }] = useMutation(
    CreateTenantAnonymousDocument
  );
  const { logo } = useApp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await createTenantAnonymous({
        variables: {
          tenant: {
            owner: { email, firstName, lastName },
            plan: "BASIC",
            logo,
            name: "",
          },
        },
      });
      didSignup(email);
    } catch (error) {
      setErrorMsg(
        "There was an error when creating the account. Try again, otherwise contact support."
      );
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
          label="Email address*"
          placeholder="Enter your email"
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <InputComponent
          type="text"
          label="First name"
          placeholder="Enter your first name"
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <InputComponent
          type="text"
          label="Last name"
          placeholder="Enter your last name"
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!email}
            size="md"
            type="primary"
            fullWidth={true}
          >
            Create account
          </NblocksButton>
        </div>
      </form>
      <div>
        <TextComponent size="sm">
          Already have an account?&nbsp;
          <LinkComponent
            to={RouteConfig.login.LoginScreen}
            type="primary"
            size="sm"
          >
            Log in
          </LinkComponent>
        </TextComponent>
      </div>
    </>
  );
};

export { SignupComponent };
