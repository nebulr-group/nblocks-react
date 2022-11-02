import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";

const intialContext: LibConfig = {
  handoverRoute: "/",
  defaultLocale: "en",
  apiHost: "http://localhost:3000",
  graphqlPath: "/graphql",
  debug: false,
  openRoutes: [],
  languages: ["en"],
  passwordComplexity: false,
  socialLogins: {
    accountApiHost: "",
    appId: "",
    providers: {
      google: false,
      github: false,
      facebook: false,
    },
  },
  signup: false,
};

const Context = React.createContext<LibConfig>(intialContext);
const useConfig = () => useContext(Context);

const NblocksConfigContextProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  children: React.ReactNode;
}> = ({ children, config }) => {
  return (
    <Context.Provider value={{ ...intialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksConfigContextProvider, useConfig };
