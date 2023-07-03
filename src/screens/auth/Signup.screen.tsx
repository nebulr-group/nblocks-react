import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/auth/SignupComponent";
import { SignupSuccessComponent } from "../../components/auth/SignupSuccessComponent";
import { FederationType } from "../../utils/AuthService";
import { useSecureContext } from "../../hooks/secure-http-context";
import { useTranslation } from "react-i18next";

const SignupScreen: FunctionComponent<{}> = () => {
  const { authService } = useSecureContext();
  const [didSignup, setDidSignup] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

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
    } else {
      return (
        <SignupComponent
          didSignup={(email) => onDidSignup(email)}
          didClickFederatedSignup={(type) => onDidClickFederatedSignup(type)}
        />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={didSignup ? t("Check your email") : t("Create an account")}
      subHeading={didSignup ? `We sent an invite link to ${email}.` : ""}
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
