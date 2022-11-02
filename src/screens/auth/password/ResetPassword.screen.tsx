import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { ResetPasswordComponent } from "../../../components/auth/password/ResetPasswordComponent";
import { ResetPasswordSuccessComponent } from "../../../components/auth/password/ResetPasswordSuccessComponent";

const ResetPasswordScreen: FunctionComponent<{}> = () => {
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");

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
      heading={linkSent ? "Check your email" : "Forgot password?"}
      subHeading={
        linkSent
          ? `We sent a password reset link to ${email}.`
          : "No worries, we'll send you reset instructions."
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { ResetPasswordScreen };
