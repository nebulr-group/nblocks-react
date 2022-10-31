import { useMutation } from "@apollo/client";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { CreateTenantAnonymousDocument } from "../../gql/graphql";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { InputComponent } from "../shared/InputComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { NblocksButton } from "../shared/NblocksButton";

type ComponentProps = {
  didSignup: () => void;
};

const SignupComponent: FunctionComponent<ComponentProps> = ({ didSignup }) => {
  const [createTenantAnonymous, {loading}] = useMutation(CreateTenantAnonymousDocument);
  const {logo} = useApp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await createTenantAnonymous({variables: {tenant: {owner: {email, firstName, lastName}, plan:"BASIC", logo, name: ""}}});
    didSignup();
  };

  return (
    <>
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
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Already have an accout? Log in
        </LinkComponent>
      </div>
    </>
  );
};

export { SignupComponent };
