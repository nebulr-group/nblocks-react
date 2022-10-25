import React from "react";
import {
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { UserListScreen } from "../screens/user/UserList.screen";

const UserRoutes = () => {

  return (
    <Routes>
      <Route path="list" element={<UserListScreen />}></Route>
      <Route path="*" element={<Navigate to="/user/list" replace />} />
    </Routes>
  );
};

export { UserRoutes };
