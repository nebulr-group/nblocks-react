import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/setup/SignupComponent";
import { SignupSuccessComponent } from "../../components/setup/SignupSuccessComponent";

const SignupScreen: FunctionComponent<{}> = () => {
  const [didSignup, setDidSignup] = useState(false);
  const [email, setEmail] = useState("");

  const onDidSignup = (email: string) => {
    setDidSignup(true);
    setEmail(email);
  };

  const renderChild = () => {
    if (didSignup) {
      return <SignupSuccessComponent />;
    } else {
      return <SignupComponent didSignup={(email) => onDidSignup(email)} />;
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={didSignup ? "Check your email" : "Create an account"}
      subHeading={didSignup ? `We sent an invite link to ${email}.` : ""}
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
