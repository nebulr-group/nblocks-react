import { useMutation } from "@apollo/client";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateTenantAnonymousDocument } from "../../gql/graphql";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { AlertComponent } from "../shared/AlertComponent";
import { InputComponent } from "../shared/InputComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { TextComponent } from "../shared/TextComponent";
import { useConfig } from "../../hooks/config-context";
import { FederationType } from "../../utils/AuthService";
import { AzureAdSsoButtonComponent } from "./shared/AzureAdSsoButtonComponent";
import { GoogleSsoButtonComponent } from "./shared/GoogleSsoButtonComponent";
import { useTranslation } from "react-i18next";
import { DividerComponent } from "../shared/DividerComponent";

type ComponentProps = {
  didSignup: (email: string) => void;
  didClickFederatedSignup: (type: FederationType) => void;
};

const SignupComponent: FunctionComponent<ComponentProps> = ({
  didSignup,
  didClickFederatedSignup,
}) => {
  const [createTenantAnonymous, { loading }] = useMutation(
    CreateTenantAnonymousDocument
  );
  const { authLegacy, demoSSO } = useConfig();
  const { logo, azureAdSsoEnabled, googleSsoEnabled } = useApp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  // Show SSO Login btn if we have it enabled or demoSSO is true
  const azureAdLogin = !authLegacy && (azureAdSsoEnabled || demoSSO);
  const googleLogin = !authLegacy && (googleSsoEnabled || demoSSO);

  const { plan } = useParams();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await createTenantAnonymous({
        variables: {
          tenant: {
            owner: { email, firstName, lastName },
            plan: plan ? plan : undefined,
            logo,
            name: "",
          },
        },
      });
      didSignup(email);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        t(
          "There was an error when creating the account. Try again, otherwise contact support."
        )
      );
      setIsLoading(false);
    }
  };

  const signupMiddleware = (type: FederationType) => {
    setIsLoading(true);
    didClickFederatedSignup(type);
  };

  const renderAzureAd = () => {
    if (azureAdLogin) {
      return (
        <AzureAdSsoButtonComponent
          mode="signup"
          onClick={() => signupMiddleware("ms-azure-ad")}
        ></AzureAdSsoButtonComponent>
      );
    }
  };

  const renderGoogle = () => {
    if (googleLogin) {
      return (
        <GoogleSsoButtonComponent
          mode="signup"
          onClick={() => signupMiddleware("google")}
        ></GoogleSsoButtonComponent>
      );
    }
  };

  const renderSignupAlternatives = () => {
    const hasAlternative = googleLogin || azureAdLogin;
    return (
      <>
        {hasAlternative && (
          <div className="py-2">
            <DividerComponent text={t("Or")} />
          </div>
        )}
        <div className="space-y-2">
          {renderGoogle()}
          {renderAzureAd()}
        </div>
      </>
    );
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title={t("An error occured")}
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
          label={t("Email address*")}
          placeholder={t("Enter your email")}
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <InputComponent
          type="text"
          label={t("First name")}
          placeholder={t("Enter your first name")}
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <InputComponent
          type="text"
          label={t("Last name")}
          placeholder={t("Enter your last name")}
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!email}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {t("Create account")}
          </NblocksButton>
        </div>
        {renderSignupAlternatives()}
      </form>
      <div className="mt-8">
        <TextComponent size="sm">
          {t("Already have an account?")}&nbsp;
          <LinkComponent
            to={RouteConfig.login.loginScreen}
            type="primary"
            size="sm"
            className="font-semibold"
          >
            {t("Log in")}
          </LinkComponent>
        </TextComponent>
      </div>
    </>
  );
};

export { SignupComponent };
