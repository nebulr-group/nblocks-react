import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { PlanScreen } from "../screens/tenant/Plan.screen";

const TenantRoutes = () => {
  return (
    <Routes>
      <Route path="/plan/:planName" element={<PlanScreen />}></Route>
      <Route path="/plan/" element={<PlanScreen />}></Route>
    </Routes>
  );
};

export { TenantRoutes };
