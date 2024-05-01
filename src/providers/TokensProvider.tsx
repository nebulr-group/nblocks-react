import React, { FunctionComponent, useEffect, useState } from "react";
import { useTokensLocalStorage } from "../hooks/UseTokensLocalStorage";
import { useLog } from "../hooks/UseLog";

const Context = React.createContext<{
  accessToken: string | undefined;
  refreshToken: string | undefined;
  idToken: string | undefined;
  setAccessToken: (token?: string) => void;
  setRefreshToken: (token?: string) => void;
  setIdToken: (token?: string) => void;
  destroyTokens: () => void;
} | undefined>(undefined);

const TokensContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { log } = useLog();
  const tokenLocalStorage = useTokensLocalStorage();

  const [accessToken, _setAccessToken] = useState<string | undefined>(tokenLocalStorage.getAccessToken());
  const [refreshToken, _setRefreshToken] = useState<string | undefined>(tokenLocalStorage.getRefreshToken());
  const [idToken, _setIdToken] = useState<string | undefined>(tokenLocalStorage.getIdToken());

  // useEffect(() => {
  //   _setAccessToken(tokenLocalStorage.getAccessToken());
  //   _setRefreshToken(tokenLocalStorage.getRefreshToken());
  //   _setIdToken(tokenLocalStorage.getIdToken());
  // }, []);

  const setAccessToken = (token?: string) => {
    tokenLocalStorage.setAccessToken(token);
    _setAccessToken(token);
  }

  const setRefreshToken = (token?: string) => {
    tokenLocalStorage.setRefreshToken(token);
    _setRefreshToken(token);
  }

  const setIdToken = (token?: string) => {
    tokenLocalStorage.setIdToken(token);
    _setIdToken(token);
  }

  const destroyTokens = () => {
    _setAccessToken(undefined);
    _setRefreshToken(undefined);
    _setIdToken(undefined);
    tokenLocalStorage.destroyStorage();
  }

  // log(`4. Rendering TokensContextProvider`);

  return (
    <Context.Provider value={{ accessToken, idToken, refreshToken, setAccessToken, setRefreshToken, setIdToken, destroyTokens }}>
      {children}
    </Context.Provider>
  );
};

export { TokensContextProvider, Context };
