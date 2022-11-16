import React from "react";
import { Navigate } from "react-router";
import { TenantLayoutWrapperComponent } from "../../components/tenant/TenantLayoutWrapperComponent";
import { useConfig } from "../../hooks/config-context";

const PaymentSuccessScreen = () => {
  const { handoverRoute } = useConfig();

  return <Navigate to={handoverRoute} />;
};

export { PaymentSuccessScreen };
