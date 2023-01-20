import { FunctionComponent } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NBAuthGuard } from "./AuthGuard";
import { AuthRoutes } from "./AuthRoutes";
import { OnboardRoutes } from "./OnboardRoutes";
import { SetupRoutes } from "./SetupRoutes";
import { UserRoutes } from "./UserRoutes";
import { BrandExpoScreen } from "../screens/BrandExpo.screen";
import { GraphqlExpoScreen } from "../screens/GraphqlExpo.screen";
import { TenantRoutes } from "./TenantRoutes";

const SpaRouter: FunctionComponent<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/onboard/*" element={<OnboardRoutes />} />
        <Route path="/setup/*" element={<SetupRoutes />} />
        <Route path="/tenant/*" element={<TenantRoutes />} />
        <Route
          path="/user/*"
          element={
            <NBAuthGuard>
              <UserRoutes />
            </NBAuthGuard>
          }
        />
        <Route path="/brandExpo" element={<BrandExpoScreen />} />
        <Route path="/graphqlExpo" element={<GraphqlExpoScreen />} />
        <Route path="/" element={<NBAuthGuard>{children}</NBAuthGuard>} />
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
};

export { SpaRouter };
