import React, { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { RouteConfig } from "../../routes/AuthRoutes";

/**
 * TODO is this screen still valid?
 * @returns
 */
const PaymentCancel: FunctionComponent = () => {
  return <Navigate to={RouteConfig.tenant.planScreen} />;
};

export { PaymentCancel };
