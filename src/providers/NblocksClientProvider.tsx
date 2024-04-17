import React, { FunctionComponent } from "react";
import { useConfig } from "./ConfigProvider";
import { NblocksPublicClient } from "@nebulr-group/nblocks-ts-client";
import { useLog } from "../hooks/UseLog";

const Context = React.createContext<{
  nblocksClient: NblocksPublicClient;
} | undefined>(undefined);

const NblocksClientContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { appId, debug, stage } = useConfig();
  const { log } = useLog();

  const nblocksClient =
    new NblocksPublicClient({
      appId,
      stage,
      debug
    });

  log('New NblocksPublicClient instanciated!');

  log(`3. Rendering NblocksClientContextProvider`);
  return (
    <Context.Provider value={{ nblocksClient }}>
      {children}
    </Context.Provider>
  );
};

export { NblocksClientContextProvider, Context }