import React, { FunctionComponent, useEffect, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ResetPasswordComponent } from "../../../components/auth/password/ResetPasswordComponent";
import { ResetPasswordSuccessComponent } from "../../../components/auth/password/ResetPasswordSuccessComponent";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface Props {}

const ResetPasswordScreen: FunctionComponent<Props> = ({}) => {
  const location = useLocation();
  const { username } = location.state;
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (username) {
      setEmail(username);
    }
  }, [username]);

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
          init={username}
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
