import React, { FunctionComponent } from "react";
import { LoginScreen } from "../screens/Login.screen";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import { LogoutScreen } from "../screens/Logout.screen";

const AuthRoutes: FunctionComponent<{}> = ({}) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="login" element={<LoginScreen />}></Route>
          <Route path="logout" element={<LogoutScreen />}></Route>
          <Route path="" element={<Navigate to="/auth/login" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AuthRoutes };
