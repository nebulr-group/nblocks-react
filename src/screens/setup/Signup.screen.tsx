import React, { FunctionComponent } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { SignupComponent } from "../../components/setup/SignupComponent";

const SignupScreen: FunctionComponent<{}> = () => {
  const onDidSignup = () => {};

  return (
    <AuthLayoutWrapperComponent heading={"Create an account"} subHeading={""}>
      <SignupComponent didSignup={() => onDidSignup()} />
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
