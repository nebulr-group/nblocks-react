import { useEffect } from "react";
import { useAuth } from "../hooks/auth-context";
import {
  Navigate
} from "react-router-dom";

export function LogoutScreen() {
  const {logout } = useAuth();

  useEffect(() => {
    logout();
  })

  return (
    <Navigate to="/auth/login" replace />
  )
}