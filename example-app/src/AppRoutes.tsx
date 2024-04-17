import { Route, Routes, BrowserRouter } from "react-router-dom";
// @ts-ignore
import { LoginComponent, LogoutComponent, CallbackComponent } from '@nebulr-group/nblocks-react-slim';
import { TestComponent } from "./TestComponent";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="/auth/oauth-callback" element={<CallbackComponent />} />
        <Route path="/" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
