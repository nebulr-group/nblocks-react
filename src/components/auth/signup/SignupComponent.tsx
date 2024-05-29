import { useMutation } from "@apollo/client";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useApp } from "../../../hooks/app-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { TextComponent } from "../../shared/TextComponent";
import { FederationType } from "../../../utils/AuthService";
import { useTranslation } from "react-i18next";
import { DividerComponent } from "../../shared/DividerComponent";
import { SsoButtonsComponent } from "../login/SsoButtonsComponent";
import { ErrorDetails } from "../../../types/error-details";
import { PasswordInputComponent } from "../password/PasswordInputComponent";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { LoginSessionCreatedResponse } from "../../../utils/OAuthService";

type ComponentProps = {
  didSignup: (email: string, session?: LoginSessionCreatedResponse) => void;
  didReceiveExistingUser: () => void;
  didClickFederatedSignup: (type: FederationType) => void;
  initalError?: boolean;
  errorDetails?: ErrorDetails;
};

const SignupComponent: FunctionComponent<ComponentProps> = ({
  didSignup,
  didClickFederatedSignup,
  initalError,
  errorDetails,
  didReceiveExistingUser,
}) => {
  const { privacyPolicyUrl, termsOfServiceUrl } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSsoAlternatives, setHasSsoAlternatives] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const { t } = useTranslation();

  const { authService } = useSecureContext();

  const generalErrorMsg = t(
    "There was an error when creating the account. Try again, otherwise contact support."
  );

  useEffect(() => {
    if (initalError) {
      if (errorDetails === "seu") {
        setExistingUser(true);
      } else {
        setErrorMsg(generalErrorMsg);
      }
    }
  }, [initalError]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { success, newUser, session } = await authService.signup({
        owner: { email, password, firstName, lastName },
        ignoreExistingUser: existingUser, // We can submit again with this flag
      });
      if (success) {
        didSignup(email, session);
      } else {
        // The signup was not successfull / completed
        if (!newUser) {
          setExistingUser(true);
          didReceiveExistingUser();
        } else {
          throw new Error("Could not signup");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(generalErrorMsg);
      setIsLoading(false);
    }
  };

  const signupMiddleware = (type: FederationType) => {
    setIsLoading(true);
    didClickFederatedSignup(type);
  };

  const renderSignupAlternatives = () => {
    if (existingUser) return null;
    return (
      <>
        {hasSsoAlternatives && (
          <div className="py-2">
            <DividerComponent text={t("Or")} />
          </div>
        )}
        <div className="space-y-2">
          <SsoButtonsComponent
            label="signup"
            didClickSsoBtn={signupMiddleware}
            hasAlternatives={setHasSsoAlternatives}
          />
        </div>
      </>
    );
  };

  const onDidProvideValidPassword = (pwd: string) => {
    setPassword(pwd);
  };

  const renderInputComponents = () => {
    if (existingUser) return null;
    return (
      <>
        <InputComponent
          type="email"
          label={t("Email address*")}
          placeholder={t("Enter your email")}
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <PasswordInputComponent
          didProvideValidPassword={onDidProvideValidPassword}
        />
        <InputComponent
          type="text"
          label={t("First name (optional)")}
          placeholder={t("Enter your first name")}
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <InputComponent
          type="text"
          label={t("Last name (optional)")}
          placeholder={t("Enter your last name")}
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
      </>
    );
  };

  const formValid = email && password;

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
        {renderInputComponents()}
        <div className="mt-8">
          <TextComponent size="sm">
            {t("By proceeding you agree to the Nblocks")}
            &nbsp;
            <LinkComponent
              type="primary"
              to={privacyPolicyUrl!}
              nativeBehavior={true}
              target="_blank"
              size="sm"
              className="font-semibold"
            >
              {t("privacy policy")}
            </LinkComponent>
            &nbsp;&amp;&nbsp;
            <LinkComponent
              type="primary"
              to={termsOfServiceUrl!}
              nativeBehavior={true}
              target="_blank"
              size="sm"
              className="font-semibold"
            >
              {t("terms of use")}
            </LinkComponent>
          </TextComponent>
        </div>
        <div>
          <NblocksButton
            submit={true}
            disabled={!formValid}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {existingUser ? t("Yes, sign me up!") : t("Sign up")}
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
