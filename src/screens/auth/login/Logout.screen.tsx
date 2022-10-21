import React, { useEffect } from "react";

import {
  Navigate
} from "react-router-dom";
import { useAuth } from "../../../hooks/auth-context";

export function LogoutScreen() {
  const {logout } = useAuth();

  useEffect(() => {
    logout();
  })

  return (
    <Navigate to="/auth/login" replace />
  )
}