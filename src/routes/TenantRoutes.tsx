import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlanScreen } from "../screens/tenant/Plan.screen";
import { NBAuthGuard } from "./AuthGuard";

const TenantRoutes = () => {
  return (
    <Routes>
      <Route
        path="plan"
        element={
          <NBAuthGuard>
            <PlanScreen />
          </NBAuthGuard>
        }
      ></Route>
    </Routes>
  );
};

export { TenantRoutes };
