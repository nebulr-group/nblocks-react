import React, { FunctionComponent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayoutWrapperComponent } from "../../components/auth/AuthLayoutWrapperComponent";
import { OnboardTenantComponent } from "../../components/auth/onboard/OnboardTenantComponent";
import { useApp } from "../../hooks/app-context";
import { useConfig } from "../../hooks/config-context";
import { RouteConfig } from "../../routes/AuthRoutes";

const OnboardTenantScreen: FunctionComponent<{}> = () => {
  document.title = "Onboard workspace";

  const app = useApp();
  const { debug, handoverRoute } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (app.onboardingFlow !== "B2B") {
    //   navigate(targetUrl);
    // }
  }, [app]);

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onDidCompleteOnboarding = () => {
    navigate(RouteConfig.onboard.onboardingStart, { state: { targetUrl } });
  };

  return (
    <AuthLayoutWrapperComponent
      heading={"Setup your workspace"}
      subHeading={""}
    >
      <OnboardTenantComponent
        didCompleteOnboarding={() => onDidCompleteOnboarding()}
      />
    </AuthLayoutWrapperComponent>
  );
};

export { OnboardTenantScreen };
