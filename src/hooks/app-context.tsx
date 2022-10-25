import React, { FunctionComponent, useContext } from "react";
import { App, useGetAppAnonymousQuery } from "../generated/graphql";
import { useConfig } from "./config-context";

const initialContext:App = {
};

const AppContext = React.createContext<App>(initialContext);
const useApp = () => useContext(AppContext);

const NblocksAppContextProvider: FunctionComponent<{children: React.ReactNode;}> = ({children}) => {

  const config = useConfig();
  const {data, loading, error} = useGetAppAnonymousQuery();

  return (
    <AppContext.Provider value={
      {...initialContext,...data?.getAppAnonymous}}>
      {children}
    </AppContext.Provider>
  );
}

export {NblocksAppContextProvider, useApp};