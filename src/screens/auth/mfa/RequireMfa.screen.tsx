import React, { FunctionComponent } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RequireMfaComponent } from "../../../components/auth/mfa/RequireMfaComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { useTranslation } from "react-i18next";
import { useRedirect } from "../../../hooks/use-redirect";

const RequireMfaScreen: FunctionComponent<{}> = () => {
  const { navigate } = useRedirect();
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
