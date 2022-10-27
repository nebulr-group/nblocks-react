import { useQuery } from "@apollo/client";
import React, { FunctionComponent, useContext } from "react";
import { App, GetAppAnonymousDocument } from "../gql/graphql";
import { useConfig } from "./config-context";

const initialContext: App = {};

const AppContext = React.createContext<App>(initialContext);
const useApp = () => useContext(AppContext);

const NblocksAppContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data, loading, error } = useQuery(GetAppAnonymousDocument);

  return (
    <AppContext.Provider
      value={{ ...initialContext, ...data?.getAppAnonymous }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { NblocksAppContextProvider, useApp };
