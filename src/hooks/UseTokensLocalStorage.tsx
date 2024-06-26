
const useTokensLocalStorage = () => {

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

  const setAccessToken = (token?: string) => {
    if (token)
      window.localStorage.setItem(accessTokenName, token);
    else
      window.localStorage.removeItem(accessTokenName);
  }

  const setIdToken = (token?: string) => {
    if (token)
      window.localStorage.setItem(idTokenName, token);
    else
      window.localStorage.removeItem(idTokenName);
  }

  const setRefreshToken = (token?: string) => {
    if (token)
      window.localStorage.setItem(refreshTokenName, token);
    else
      window.localStorage.removeItem(refreshTokenName);
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

export { useTokensLocalStorage };
