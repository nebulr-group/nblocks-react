import { useMutation } from "@apollo/client";
import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateTenantAnonymousDocument } from "../../gql/graphql";
import { useApp } from "../../hooks/app-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { AlertComponent } from "../shared/AlertComponent";
import { InputComponent } from "../shared/InputComponent";
import { LinkComponent } from "../shared/LinkComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { TextComponent } from "../shared/TextComponent";
import { FederationType } from "../../utils/AuthService";
import { useTranslation } from "react-i18next";
import { DividerComponent } from "../shared/DividerComponent";
import { SsoButtonsComponent } from "./login/SsoButtonsComponent";
import { Transition } from "@headlessui/react";
import { useCustomParams } from "../../hooks/custom-params-context";

type ComponentProps = {
  didSignup: (email: string) => void;
  didClickFederatedSignup: (type: FederationType) => void;
};

const getInputType = (paramType: string): 'email' | 'tel' | 'number' | 'text' | 'checkbox' => {
  switch (paramType.toLowerCase()) {
    case 'email':
      return 'email';
    case 'phone':
      return 'tel';
    case 'number':
    case 'integer':
      return 'number';
    case 'text':
    case 'regex':
      return 'text';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
};

const SignupComponent: FunctionComponent<ComponentProps> = ({
  didSignup,
  didClickFederatedSignup,
}) => {
  const [createTenantAnonymous, { loading }] = useMutation(
    CreateTenantAnonymousDocument
  );
  const { logo, privacyPolicyUrl, termsOfServiceUrl } = useApp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSsoAlternatives, setHasSsoAlternatives] = useState(false);
  const { customParams } = useCustomParams();
  const { t } = useTranslation();

  const [params] = useSearchParams();
  const [plan, currency, recurrenceInterval] = [
    params.get("plan"),
    params.get("currency"),
    params.get("recurrenceInterval"),
  ];

  
  const [customParamValues, setCustomParamValues] = useState<Array<{value: string, type: string, label: string,userLabel: string,regex: string}>>([]);

  // intitialize custom param values
  React.useEffect(() => {
    if (customParams?.params) {
      setCustomParamValues(
        customParams.params.map(param => ({
          value: '',
          type: param.type,
          label: param.label,
          userLabel: param.userLabel,
          regex: param.regex
        }))
      );
    }
  }, [customParams]);

  

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await createTenantAnonymous({
        variables: {
          tenant: {
            owner: { email, firstName, lastName,customParams: customParamValues },
            plan: plan ? plan : undefined,
            priceOffer:
              currency && recurrenceInterval
                ? { currency, recurrenceInterval }
                : undefined,
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

  const ssoSignupMiddleware = (type: FederationType) => {
    setErrorMsg("");
    didClickFederatedSignup(type);
  };

  const renderSignupAlternatives = () => {
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
            didClickSsoBtn={ssoSignupMiddleware}
            hasAlternatives={setHasSsoAlternatives}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="max-w-sm w-full mb-6">
        <Transition
          show={!!errorMsg}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </Transition>
      </div>
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
      
        <InputComponent
          type="email"          
          label={t("Email address*")}
          placeholder={t("Enter your email")}
          name="username"
          required={true}
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
        {customParams?.params?.map((param, index) => (
          <div key={index}>
            <InputComponent
              type={getInputType(param.type)}              
              label={param.userLabel}
              placeholder={t("Enter your " + param.userLabel.toLowerCase())}
              name={param.label}              
              onChange={(event) => {                
                setCustomParamValues(prev => {
                  const newValues = [...prev];
                  newValues[index] = {
                    value: event.target.value,
                    type: param.type,
                    label: param.label,
                    userLabel: param.userLabel,
                    regex: param.regex
                  };
                  return newValues;
                });
              }}
              value={customParamValues[index]?.value || ""}
            />
          </div>
        ))}
        
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
            disabled={!email}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {t("Sign up")}
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
