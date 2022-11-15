import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { RouteConfig } from "../../routes/AuthRoutes";

const PaymentCancel: FunctionComponent = () => {
  return <Navigate to={RouteConfig.tenant.plan} />;
};

export { PaymentCancel };
