import React, { FunctionComponent, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RequireMfaComponent } from "../../../components/auth/mfa/RequireMfaComponent";
import { SetupMfaPhoneComponent } from "../../../components/auth/mfa/SetupMfaPhoneComponent";
import { SetupMfaRecoverCodeComponent } from "../../../components/auth/mfa/SetupMfaRecoverCodeComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";

const SetupMfaScreen: FunctionComponent<{}> = () => {
  const [setupStep, setSetupStep] = useState(0);
  const [recoverCode, setRecoverCode] = useState("");

  const renderSubComponent = () => {
    switch (setupStep) {
      case 0:
        return (
          <SetupMfaPhoneComponent didSetupPhoneNumber={() => setSetupStep(1)} />
        );

      case 1:
        return (
          <RequireMfaComponent
            setupMode={true}
            didCommitMfaCode={(code) => {
              setRecoverCode(code!);
              setSetupStep(2);
            }}
          />
        );

      case 2:
        return (
          <SetupMfaRecoverCodeComponent
            recoverCode={recoverCode}
            didClickContinue={() => setSetupStep(3)}
          />
        );

      case 3:
      default:
        return <Navigate to={RouteConfig.login.ChooseUserScreen} />;
    }
  };

  const getHeading = () => {
    switch (setupStep) {
      default:
        return "Set up Two Factor Authentication";
    }
  };

  const getSubHeading = () => {
    switch (setupStep) {
      case 0:
        return "You're required to set up two factor authentication. Enter your phone number below.";

      case 1:
        return "We just sent you a code to your phone. Please enter the code below.";

      case 2:
        return "You're now set up. This is your recovery code. Save and keep it safe in case you would need to reset your two factor authentication.";

      default:
        return "";
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={getHeading()}
      subHeading={getSubHeading()}
    >
      {renderSubComponent()}
    </AuthLayoutWrapperComponent>
  );
};

export { SetupMfaScreen };
