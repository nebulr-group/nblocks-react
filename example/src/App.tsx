import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import CallbackComponent from "./CallbackComponent";
import ProtectedRoute from "./ProtectedRouted";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginComponent />} />
        <Route path="/auth/oauth-callback" element={<CallbackComponent />} />
        <Route path="/forbidden" element={<span>Forbidden</span>} />
        <Route
          path="*"
          element={
            <ProtectedRoute privileges={["AUTHENTICATED"]}>
              <Routes>
                <Route path="/home" element={<span>Home</span>} />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute
                      privileges={["ANALYTICS"]}
                      redirectTo="/forbidden"
                    >
                      <span>Private</span>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={<span>Protected</span>}
                ></Route>
              </Routes>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
