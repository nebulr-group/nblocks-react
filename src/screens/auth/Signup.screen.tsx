import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/auth/SignupComponent";
import { SignupSuccessComponent } from "../../components/auth/SignupSuccessComponent";
import { FederationType } from "../../utils/AuthService";
import { useSecureContext } from "../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ContinueSignupFederationComponent } from "../../components/auth/ContinueSignupFederationComponent";
import { useRedirect } from "../../hooks/use-redirect";
import { ErrorDetails } from "../../types/error-details";

const SignupScreen: FunctionComponent<{}> = () => {
  const { authService } = useSecureContext();
  const [didSignup, setDidSignup] = useState(false);
  const { navigate } = useRedirect();
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [paramError, paramErrorDetails, federation] = [
    params.get("error"),
    params.get("details") as ErrorDetails | undefined,
    params.get("federation") as FederationType | undefined,
  ];

  const federationMissingUserError =
    paramError && paramErrorDetails == "fmu" && federation;
  const existingUserError = paramError && paramErrorDetails == "seu";

  const onDidSignup = (email: string) => {
    setDidSignup(true);
    setEmail(email);
  };

  const onDidClickFederatedSignup = (type: FederationType) => {
    const url = authService.getFederatedSignupUrl(type, !!existingUserError);
    navigate(url!);
  };

  const renderChild = () => {
    if (didSignup) {
      return <SignupSuccessComponent />;
    }

    if (federationMissingUserError) {
      return (
        <ContinueSignupFederationComponent
          didSignup={(email) => onDidSignup(email)}
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
          federation={federation}
        />
      );
    }

    if (existingUserError) {
      if (federation)
        return (
          <ContinueSignupFederationComponent
            didSignup={(email) => onDidSignup(email)}
            didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
            federation={federation}
          />
        );
      else
        return (
          <SignupComponent
            didSignup={(email) => onDidSignup(email)}
            didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
            initalError={!!paramError}
            errorDetails={paramErrorDetails}
          />
        );
    }

    return (
      <SignupComponent
        didSignup={(email) => onDidSignup(email)}
        didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
        initalError={!!paramError}
        errorDetails={paramErrorDetails}
      />
    );
  };

  const federationName = (federation: FederationType) => {
    switch (federation) {
      case "google":
        return "Google";
      case "ms-azure-ad":
        return "Microsoft";
      default:
        return "SSO";
    }
  };

  const generateHeadings = (): {
    heading: string;
    subHeading: string;
  } => {
    if (didSignup) {
      return {
        heading: t("Check your email"),
        subHeading: t("We sent an invite link to {{email}}.", { email: email }),
      };
    } else {
      if (federationMissingUserError) {
        return {
          heading: t("Looks like you're new here!"),
          subHeading: t(
            "Continue with {{federationName}} to create your account",
            { federationName: federationName(federation) }
          ),
        };
      }

      if (existingUserError) {
        return {
          heading: t("You look familiar!"),
          subHeading: t(
            "You already have an account. Are you sure you want to create another one? You'll keep your existing credentials"
          ),
        };
      }
    }

    return {
      heading: t("Create an account"),
      subHeading: "",
    };
  };

  const { heading, subHeading } = generateHeadings();

  return (
    <AuthLayoutWrapperComponent
      heading={heading}
      subHeading={subHeading}
      showPrivacyPolicy={didSignup}
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
