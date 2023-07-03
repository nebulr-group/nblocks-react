import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RequireMfaComponent } from "../../../components/auth/mfa/RequireMfaComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { useTranslation } from "react-i18next";

const RequireMfaScreen: FunctionComponent<{}> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Callback when the Component completed the heavylifting
  const onDidCommitMfaCode = () => {
    navigate(RouteConfig.login.chooseUserScreen);
  };

  return (
    <AuthLayoutWrapperComponent
      heading={t("Two Factor Authentication")}
      subHeading={t(
        "We just sent you a code to your phone. Please enter the code below."
      )}
    >
      <RequireMfaComponent didCommitMfaCode={() => onDidCommitMfaCode()} />
    </AuthLayoutWrapperComponent>
  );
};

export { RequireMfaScreen };
