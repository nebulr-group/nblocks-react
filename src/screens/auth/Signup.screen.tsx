import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/auth/SignupComponent";
import { SignupSuccessComponent } from "../../components/auth/SignupSuccessComponent";
import { FederationType } from "../../utils/AuthService";
import { useSecureContext } from "../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { SignupMissingUserComponent } from "../../components/auth/SignupMissingUserComponent";

const SignupScreen: FunctionComponent<{}> = () => {
  const { authService } = useSecureContext();
  const [didSignup, setDidSignup] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const [paramError, federation] = [
    params.get("error"),
    params.get("federation") as FederationType,
  ];

  const onDidSignup = (email: string) => {
    setDidSignup(true);
    setEmail(email);
  };

  const onDidClickFederatedSignup = (type: FederationType) => {
    const url = authService.getFederatedSignupUrl(type);
    window.location.href = url!;
  };

  const renderChild = () => {
    if (didSignup) {
      return <SignupSuccessComponent />;
    } else if (paramError && federation) {
      return (
        <SignupMissingUserComponent
          didSignup={(email) => onDidSignup(email)}
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
          federation={federation}
        />
      );
    } else {
      return (
        <SignupComponent
          didSignup={(email) => onDidSignup(email)}
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
        />
      );
    }
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
    }
    if (!didSignup && paramError && federation) {
      return {
        heading: t("Looks like you're new here!"),
        subHeading: t(
          "Continue with {{federationName}} to create your account",
          { federationName: federationName(federation) }
        ),
      };
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
