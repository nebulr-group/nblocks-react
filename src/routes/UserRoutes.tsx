import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { UserListScreen } from "../screens/user/UserList.screen";
import { RouteConfig } from "./AuthRoutes";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<UserListScreen />}></Route>
      <Route
        path="*"
        element={<Navigate to={RouteConfig.user.list} replace={true} />}
      />
    </Routes>
  );
};

export { UserRoutes };
