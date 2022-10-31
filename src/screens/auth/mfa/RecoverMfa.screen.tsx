import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RecoverMfaComponent } from "../../../components/auth/mfa/RecoverMfaComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";

const RecoverMfaScreen: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const onDidRecoverMfaCode = () => {
    navigate(RouteConfig.mfa.SetupMfaScreen);
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Reset Two Factor Authentication"}
      subHeading={
        "Use your recovery code to reset your two factor authentication. Contact support if you have lost your code."
      }
    >
      <RecoverMfaComponent didRecoverMfaCode={() => onDidRecoverMfaCode()} />
    </AuthLayoutWrapperComponent>
  );
};

export { RecoverMfaScreen };
