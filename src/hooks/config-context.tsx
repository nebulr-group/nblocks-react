import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";

const initialContext: LibConfig = {
  devMode: false,
  handoverRoute: "/",
  defaultLocale: "en",
  apiHost: "http://localhost:3000",
  graphqlPath: "/graphql",
  debug: false,
  openRoutes: [],
  languages: ["en"],
  passwordComplexity: true,
  spa: false,
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

const Context = React.createContext<LibConfig>(initialContext);
const useConfig = () => useContext(Context);

const NblocksConfigContextProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  children: React.ReactNode;
}> = ({ children, config }) => {
  // Set some sensible defaults for devMode
  if (config?.devMode) {
    initialContext.spa = true;
    initialContext.signup = true;
    initialContext.passwordComplexity = false;
  }

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksConfigContextProvider, useConfig };
