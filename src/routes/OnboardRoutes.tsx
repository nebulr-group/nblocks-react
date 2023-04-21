import React from "react";
import { Route, Routes } from "react-router-dom";
import { OnboardTenantScreen } from "../screens/onboard/OnboardTenant.screen";
import { OnboardUserScreen } from "../screens/onboard/OnboardUser.screen";
import { OnboardingScreen } from "../screens/onboard/Onboarding.screen";

const OnboardRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<OnboardingScreen />}></Route>
      <Route path="user" element={<OnboardUserScreen />}></Route>
      <Route path="tenant" element={<OnboardTenantScreen />}></Route>
    </Routes>
  );
};

export { OnboardRoutes };
