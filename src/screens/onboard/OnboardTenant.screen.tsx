import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardTenantComponent } from "../../components/auth/onboard/OnboardTenantComponent";
import { RouteConfig } from "../../routes/AuthRoutes";

const OnboardTenantScreen: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

  const onDidCompleteOnboarding = () => {
    navigate(RouteConfig.login.chooseUserScreen);
  };

  return (
    <OnboardTenantComponent
      didCompleteOnboarding={() => onDidCompleteOnboarding()}
    />
  );
};

export { OnboardTenantScreen };
