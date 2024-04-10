import React from "react";

const useTokensStorage = () => {

  const accessTokenName = "NB_ACCESS_TOKEN";
  const idTokenName = "NB_ID_TOKEN";
  const refreshTokenName = "NB_REFRESH_TOKEN";

  const getAccessToken = () => {
    return window.localStorage.getItem(accessTokenName) || undefined;
  }

  const getIdToken = () => {
    return window.localStorage.getItem(idTokenName) || undefined;
  }

  const getRefreshToken = () => {
    return window.localStorage.getItem(refreshTokenName) || undefined;
  }

  const setAccessToken = (token: string) => {
    window.localStorage.setItem(accessTokenName, token);
  }

  const setIdToken = (token: string) => {
    window.localStorage.setItem(idTokenName, token);
  }

  const setRefreshToken = (token: string) => {
    window.localStorage.setItem(refreshTokenName, token);
  }

  const destroyStorage = () => {
    window.localStorage.removeItem(accessTokenName);
    window.localStorage.removeItem(idTokenName);
    window.localStorage.removeItem(refreshTokenName);
  }
  
  return {
    getAccessToken,
    getIdToken,
    getRefreshToken,
    setAccessToken,
    setIdToken,
    setRefreshToken,
    destroyStorage
  };
};

export { useTokensStorage };
