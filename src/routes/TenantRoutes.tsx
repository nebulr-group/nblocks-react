import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlansScreen } from "../screens/tenant/Plans.screen";
import { NBAuthGuard } from "./AuthGuard";

const TenantRoutes = () => {
  return (
    <Routes>
      <Route
        path="plan"
        element={
          <NBAuthGuard>
            <PlansScreen />
          </NBAuthGuard>
        }
      ></Route>
    </Routes>
  );
};

export { TenantRoutes };
