import React, { FunctionComponent, useEffect, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/auth/signup/SignupComponent";
import { SignupSuccessComponent } from "../../components/auth/signup/SignupSuccessComponent";
import { FederationType, MfaState } from "../../utils/AuthService";
import { useSecureContext } from "../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ContinueSignupFederationComponent } from "../../components/auth/signup/ContinueSignupFederationComponent";
import { useRedirect } from "../../hooks/use-redirect";
import { ErrorDetails } from "../../types/error-details";
import { LoginSessionCreatedResponse } from "../../utils/OAuthService";
import { useLogin } from "../../hooks/use-login";

const SignupScreen: FunctionComponent<{}> = () => {
  const { authService } = useSecureContext();
  const [didSignup, setDidSignup] = useState(false);
  const [existingUserError, setExistingUserError] = useState(false);
  const { navigate } = useRedirect();
  const [email, setEmail] = useState("");
  const { handleDidLogin } = useLogin();
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [paramError, paramErrorDetails, federation] = [
    params.get("error"),
    params.get("details") as ErrorDetails | undefined,
    params.get("federation") as FederationType | undefined,
  ];

  const federationMissingUserError =
    paramError && paramErrorDetails == "fmu" && federation;

  const federationExistingUserError =
    paramError && paramErrorDetails == "seu" && federation;

  useEffect(() => {
    setExistingUserError(!!paramError && paramErrorDetails == "seu");
  }, [paramError]);

  const onDidSignup = (
    email: string,
    session?: LoginSessionCreatedResponse
  ) => {
    if (session) {
      // User is already logged in to
      handleDidLogin(session.mfaState as MfaState, session.tenantUserId);
    } else {
      // Classic flow, check email.
      setDidSignup(true);
      setEmail(email);
    }
  };

  const onDidClickFederatedSignup = (type: FederationType) => {
    const url = authService.getFederatedSignupUrl(type, !!existingUserError);
    navigate(url!);
  };

  const onDidReceiveExistingUser = () => {
    setExistingUserError(true);
  };

  const renderChild = () => {
    if (didSignup) {
      return <SignupSuccessComponent />;
    }

    if (federationMissingUserError) {
      return (
        <ContinueSignupFederationComponent
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
          federation={federation}
        />
      );
    }

    if (federationExistingUserError)
      return (
        <ContinueSignupFederationComponent
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
          federation={federation}
        />
      );

    return (
      <SignupComponent
        didSignup={onDidSignup}
        didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
        initalError={!!paramError}
        errorDetails={paramErrorDetails}
        didReceiveExistingUser={onDidReceiveExistingUser}
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
            "You already have an account. Are you sure you want to create another workspace?<br/>You'll keep your existing credentials"
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
