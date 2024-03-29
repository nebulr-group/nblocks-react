import React, { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { OnboardUserComponent } from "../../components/auth/onboard/OnboardUserComponent";
import { useConfig } from "../../hooks/config-context";
import { RouteConfig } from "../../routes/AuthRoutes";
import { useTranslation } from "react-i18next";

// TODO add support for pulling current user data + redirect to tenant onboarding if that is missing
const OnboardUserScreen: FunctionComponent<{}> = () => {
  document.title = "Onboard user";

  const { t } = useTranslation();
  const { debug, handoverRoute } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onDidCompleteOnboarding = () => {
    navigate(RouteConfig.onboard.onboardingStart, { state: { targetUrl } });
  };

  const log = (msg: string) => {
    if (debug) {
      console.log(`OnboardUserScreen: ${msg}`);
    }
  };

  return (
    <AuthLayoutWrapperComponent
      heading={t("Complete your profile")}
      subHeading={""}
    >
      <OnboardUserComponent
        didCompleteOnboarding={() => onDidCompleteOnboarding()}
      />
    </AuthLayoutWrapperComponent>
  );
};

export { OnboardUserScreen };
