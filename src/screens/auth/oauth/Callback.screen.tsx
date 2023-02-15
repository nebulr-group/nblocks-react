import React, { FunctionComponent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSecureContext } from "../../../hooks/secure-http-context";

const CallbackScreen: FunctionComponent<{}> = () => {
  const location = useLocation();
  const { authService } = useSecureContext();

  const urlSearch = new URLSearchParams(location.search);
  const code = urlSearch.get("code");
  const state = urlSearch.get("code");

  useEffect(() => {
    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleCallback = async (code: string) => {
    await authService.handleCallback(code);
  };

  return <h1>Callback</h1>;
};

export { CallbackScreen };
