import React, { FunctionComponent } from "react";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { RecoverMfaComponent } from "../../../components/auth/mfa/RecoverMfaComponent";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { useTranslation } from "react-i18next";
import { useRedirect } from "../../../hooks/use-redirect";

const RecoverMfaScreen: FunctionComponent<{}> = () => {
  const { navigate } = useRedirect();
  const { t } = useTranslation();

  const onDidRecoverMfaCode = () => {
    navigate(RouteConfig.mfa.setupMfaScreen);
  };

  return (
    <AuthLayoutWrapperComponent
      heading={t("Reset Two Factor Authentication")}
      subHeading={t(
        "Use your recovery code to reset your two factor authentication. Contact support if you have lost your code."
      )}
    >
      <RecoverMfaComponent didRecoverMfaCode={() => onDidRecoverMfaCode()} />
    </AuthLayoutWrapperComponent>
  );
};

export { RecoverMfaScreen };
