import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RequireMfaComponent } from "../../../components/auth/mfa/RequireMfaComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";

const RequireMfaScreen: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  // Callback when the Component completed the heavylifting
  const onDidCommitMfaCode = () => {
    navigate(RouteConfig.login.chooseUserScreen);
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Two Factor Authentication"}
      subHeading={
        "We just sent you a code to your phone. Please enter the code below."
      }
    >
      <RequireMfaComponent didCommitMfaCode={() => onDidCommitMfaCode()} />
    </AuthLayoutWrapperComponent>
  );
};

export { RequireMfaScreen };
