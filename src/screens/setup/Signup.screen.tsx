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
      heading={
        didSignup ? "A new app has been created" : "Create your Nblocks app"
      }
      subHeading={
        didSignup
          ? `These are your new credentials. Update your configs and create your first tenant.`
          : ""
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SignupScreen };
