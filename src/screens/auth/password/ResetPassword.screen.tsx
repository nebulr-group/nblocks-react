import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ResetPasswordComponent } from "../../../components/auth/password/ResetPasswordComponent";
import { ResetPasswordSuccessComponent } from "../../../components/auth/password/ResetPasswordSuccessComponent";
import { useTranslation } from "react-i18next";

const ResetPasswordScreen: FunctionComponent<{}> = () => {
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const onDidSendResetPasswordLink = (email: string) => {
    setEmail(email);
    setLinkSent(true);
  };

  const renderChild = () => {
    if (linkSent) {
      return <ResetPasswordSuccessComponent />;
    } else {
      return (
        <ResetPasswordComponent
          didSendResetPasswordLink={(email) =>
            onDidSendResetPasswordLink(email)
          }
        />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={linkSent ? t("Check your email") : t("Forgot password?")}
      subHeading={
        linkSent
          ? `We sent a password reset link to ${email}.`
          : t("No worries, we'll send you reset instructions.")
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { ResetPasswordScreen };
