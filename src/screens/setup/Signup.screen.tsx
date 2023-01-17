import React, { FunctionComponent, useState } from "react";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import {
  CreateAppResponse,
  SignupComponent,
} from "../../components/setup/SignupComponent";
import { SignupSuccessComponent } from "../../components/setup/SignupSuccessComponent";

const SignupScreen: FunctionComponent<{}> = () => {
  const [didSignup, setDidSignup] = useState(false);
  const [response, setResponse] = useState<CreateAppResponse>();

  const onDidSignup = (data: CreateAppResponse) => {
    setDidSignup(true);
    setResponse(data);
  };

  const renderChild = () => {
    if (didSignup) {
      return <SignupSuccessComponent response={response!} />;
    } else {
      return (
        <SignupComponent didSignup={(response) => onDidSignup(response)} />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={didSignup ? "Your new app" : "Create an app"}
      subHeading={
        didSignup ? `These are your new credentials. Save them for later` : ""
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
