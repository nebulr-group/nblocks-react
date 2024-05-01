import { Route, Routes, BrowserRouter } from "react-router-dom";
// @ts-ignore
import { LoginComponent, LogoutComponent, CallbackComponent, ProtectedRouteComponent, SubscriptionComponent, TeamComponent } from '@nebulr-group/nblocks-react-slim';
import { TestComponent } from "./TestComponent";
import { TestProtectedComponent } from "./TestProtectedComponent";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
        <Route path="/auth/oauth-callback" element={<CallbackComponent />} />
        <Route path="/" element={<TestComponent />} />
        <Route path="/team" element={<TeamComponent />} />
        <Route path="/subscription" element={<SubscriptionComponent />} />
        <Route path="/protected-redirect" element={
          <ProtectedRouteComponent>
            <Routes>
              <Route path="*" element={<TestProtectedComponent />} />
            </Routes>
          </ProtectedRouteComponent>
        }/>
        <Route path="/protected" element={
            <ProtectedRouteComponent redirectTo={"/"}>
              <Routes>
                <Route path="*" element={<TestProtectedComponent />} />
              </Routes>
            </ProtectedRouteComponent>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
