import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";

const initialContext: LibConfig = {
  devMode: false,
  backendLess: false,
  handoverRoute: "/",
  defaultLocale: "en",
  apiHost: "http://localhost:3000",
  graphqlPath: "/graphql",
  debug: false,
  openRoutes: [],
  languages: ["en"],
  passwordValidation: true,
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
  // Switch to registered backendless domain
  if (config?.backendLess) {
    config.apiHost = "http://localhost:3000"; //TODO change to "https://backendless.nblocks.cloud";
    if (!config.appId) {
      throw new Error("You must provide App id when running with backendless");
    }
  }

  // Set some sensible defaults for devMode
  if (config?.devMode) {
    initialContext.spa = true;
    initialContext.signup = true;
    initialContext.passwordValidation = false;
  }

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksConfigContextProvider, useConfig };
