import React, { FunctionComponent, useContext } from "react";

export interface LibConfig {
    // Your unique Nblocks App Id
    appId: string;

    // Output debug messages from plugin
    debug?: boolean;

    // Internal config. Used by Nblocks developers
    stage?: 'DEV' | 'STAGE' | 'PROD'
}

const initialContext: LibConfig = {
    appId: "",
    debug: false,
    stage: 'PROD'
};

const Context = React.createContext<LibConfig>(initialContext);
const useConfig = () => useContext(Context);

const ConfigContextProvider: FunctionComponent<{
  config?: Partial<LibConfig>;
  children: React.ReactNode;
}> = ({ children, config }) => {

  return (
    <Context.Provider value={{ ...initialContext, ...config }}>
      {children}
    </Context.Provider>
  );
};

export { ConfigContextProvider, useConfig };
