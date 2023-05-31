import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";

const backendlessApi = "https://backendless-stage.nblocks.cloud";
const authApi = "https://auth-stage.nblocks.cloud";
const accountApi = "https://account-api-stage.nebulr-core.com";

// const backendlessApi = "https://backendless.nblocks.cloud";
// const authApi = "https://auth.nblocks.cloud";
// const accountApi = "https://account-api.nebulr-core.com";

const oauthRedirectUri = "http://localhost:8080/auth/oauth-callback";

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
  tenantSignup: false,
  appSignup: false,
  oAuthBaseURI: authApi,
  oauthRedirectUri,
  accountApiBaseUri: accountApi,
  copyrightFooter: `©${new Date().getUTCFullYear()} Nblocks. All Rights Reserved.`,
  demoSSO: false,
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
    initialContext.apiHost = backendlessApi;
    if (!config.appId) {
      throw new Error("You must provide App id when running with backendless");
    }
  }

  // Set some sensible defaults for devMode
  if (config?.devMode) {
    initialContext.spa = true;
    initialContext.tenantSignup = true;
    initialContext.appSignup = true;
    initialContext.passwordValidation = false;
    initialContext.demoSSO = true;
  }

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksConfigContextProvider, useConfig };
