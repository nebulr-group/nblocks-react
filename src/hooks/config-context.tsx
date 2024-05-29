import React, { FunctionComponent, useContext } from "react";
import { LibConfig } from "../models/lib-config";

const backendlessApi = "https://backendless-stage.nblocks.cloud";
const oAuthUrl = "https://auth-stage.nblocks.cloud";
const accountApi = "https://account-api-stage.nebulr-core.com";

// const backendlessApi = "https://backendless.nblocks.cloud";
// const oAuthUrl = "https://auth.nblocks.cloud";
// const accountApi = "https://account-api.nebulr-core.com";

const oauthRedirectUri = "http://localhost:8080/auth/oauth-callback";

const initialContext: LibConfig = {
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
  oAuthBaseURI: oAuthUrl,
  oauthRedirectUri,
  accountApiBaseUri: accountApi,
  copyrightFooter: `©${new Date().getUTCFullYear()} Nblocks. All Rights Reserved.`,
  disableRedirects: false,
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

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksConfigContextProvider, useConfig };
