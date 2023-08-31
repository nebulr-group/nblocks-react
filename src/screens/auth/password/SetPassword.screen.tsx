import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../../components/auth/AuthLayoutWrapperComponent";
import { SetPasswordComponent } from "../../../components/auth/password/SetPasswordComponent";
import { SetPasswordSuccessComponent } from "../../../components/auth/password/SetPasswordSuccessComponent";
import { useAuth } from "../../../hooks/auth-context";
import { useTranslation } from "react-i18next";

const SetPasswordScreen: FunctionComponent = () => {
  const params = useParams();
  const resetToken = params.token!;
  const { logout, currentUser } = useAuth();
  const { t } = useTranslation();

  const [passwordReset, setPasswordReset] = useState(false);

  // It's understood we should logout the current user if logged in
  useEffect(() => {
    if (currentUser.authenticated) {
      logout();
    }
  }, [currentUser]);

  const onDidSetPassword = () => {
    setPasswordReset(true);
  };

  const renderChild = () => {
    if (passwordReset) {
      return <SetPasswordSuccessComponent />;
    } else {
      return (
        <SetPasswordComponent
          didSetPassword={() => onDidSetPassword()}
          resetToken={resetToken}
        />
      );
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={passwordReset ? t("Password set") : t("Set new password")}
      subHeading={
        passwordReset
          ? t(
              "Your new password has been successfully set. Click below to log in."
            )
          : t("Set a password to use when you sign in.")
      }
    >
      {renderChild()}
    </AuthLayoutWrapperComponent>
  );
};

export { SetPasswordScreen };
