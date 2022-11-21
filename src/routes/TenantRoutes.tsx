import React from "react";
import { Route, Routes } from "react-router-dom";
import { PaymentScreen } from "../screens/tenant/Payment.screen";
import { PaymentCancel } from "../screens/tenant/PaymentCancel.screen";
import { PaymentSuccessScreen } from "../screens/tenant/PaymentSuccess.screen";
import { PlanScreen } from "../screens/tenant/Plan.screen";

const TenantRoutes = () => {
  return (
    <Routes>
      <Route path="plan" element={<PlanScreen />}></Route>
      <Route path="payment/success" element={<PaymentSuccessScreen />}></Route>
      <Route path="payment/cancel" element={<PaymentCancel />}></Route>
      <Route path="payment/" element={<PaymentScreen />}></Route>
      <Route path="*" element={<PlanScreen />}></Route>
    </Routes>
  );
};

export { TenantRoutes };
