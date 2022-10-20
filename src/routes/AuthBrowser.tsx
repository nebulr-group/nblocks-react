import React from "react";
import {
  BrowserRouter
} from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";

const AuthBrowser = () => {

  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
};

export { AuthBrowser };
