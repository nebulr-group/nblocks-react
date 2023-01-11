import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";
import { useApp } from "./app-context";

const initialContext: LibConfig = {
  devMode: false,
  backendLess: false,
  authLegacy: true,
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
  oAuthBaseURI: "https://auth.nblocks.cloud",
  oauthRedirectUri: "http://localhost:8080/auth/login",
};

const Context = React.createContext<LibConfig>(initialContext);
const useConfig = () => useContext(Context);

const NblocksConfigContextProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  children: React.ReactNode;
}> = ({ children, config }) => {
  // This doesn't work??
  // const app = useApp();
  // if (config && !config?.oauthRedirectUri) {
  //   config.oauthRedirectUri = app.uiUrl + "/auth/login";
  // }

  // Switch to registered backendless domain
  if (config?.backendLess) {
    config.apiHost =
      config.apiHost === "http://localhost:3000"
        ? "https://backendless.nblocks.cloud"
        : config.apiHost;
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
