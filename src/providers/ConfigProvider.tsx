import { FlagContext } from "@nebulr-group/nblocks-ts-client";
import React, { FunctionComponent, useContext } from "react";

export interface LibConfig {
    // Your unique Nblocks App Id
    appId: string;

    // The path where users ends up after login (defaults to /)
    handoverPath: string;

    // Use this intial context for Feature flags (optional)
    initialFlagsContext?: FlagContext;

    // Output debug messages from plugin (defaults to false)
    debug: boolean;

    // Internal config. Used by Nblocks developers (defaults to PROD)
    stage: 'DEV' | 'STAGE' | 'PROD';

    // Disable plugin redirects. Usefull when debugging (defaults to false)
    disableRedirects: boolean;
}

const initialContext: LibConfig = {
    appId: "",
    handoverPath: "/",
    debug: false,
    stage: 'PROD',
    disableRedirects: false
};

const Context = React.createContext<LibConfig>(initialContext);
const useConfig = () => useContext(Context);

const ConfigContextProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  children: React.ReactNode;
}> = ({ children, config }) => {

  if (!config?.appId) {
    alert("Set your appId in <NblocksProvider config={{appId: 'XXX'... first")
    throw new Error("Set your appId in <NblocksProvider config={{appId: 'XXX'... first")
  }

  // if (config.debug) {
  //   console.log(`2. Rendering ConfigContextProvider`);
  // }

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { ConfigContextProvider, useConfig };
