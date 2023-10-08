import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PaymentCancel } from "../screens/tenant/PaymentCancel.screen";
import { PaymentSuccessScreen } from "../screens/tenant/PaymentSuccess.screen";
import { PlanScreen } from "../screens/tenant/Plan.screen";
import { NBAuthGuard } from "./AuthGuard";
import { RouteConfig } from "./AuthRoutes";

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
      <Route path="payment/success" element={<PaymentSuccessScreen />}></Route>
      <Route path="payment/cancel" element={<PaymentCancel />}></Route>
      <Route
        path="*"
        element={<Navigate to={RouteConfig.tenant.planScreen} replace={true} />}
      />
    </Routes>
  );
};

export { TenantRoutes };
