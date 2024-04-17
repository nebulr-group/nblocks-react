import React, { FunctionComponent, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useLog } from "../hooks/UseLog";
import { BulkEvaluationResponse } from "@nebulr-group/nblocks-ts-client";
import { useTokens } from "../hooks/UseTokens";

const Context = React.createContext<{ 
  flagEnabled: (flagKey: string) => boolean, 
  flagsStorage: BulkEvaluationResponse | undefined
} | undefined>(undefined);

const FlagsContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { nblocksClient } = useNblocksClient();
  const { accessToken } = useTokens();
  const { log } = useLog();
  const [flagsStorage, setFlagsStorage] = useState<BulkEvaluationResponse | undefined>();

  useEffect(() => {
    doBulkEvaluation();
  }, [accessToken]);

  const doBulkEvaluation = async () => {
    const response = await nblocksClient.flag.bulkEvaluate({ accessToken });
    log("Got new flags!");
    setFlagsStorage(response);
  }

  // Checks if a specific flag is enabled via storage
  const flagEnabled = (flagKey: string) => {
    if (!flagsStorage)
      return false;

    return flagsStorage.flags.some(flag => flag.flag === flagKey && flag.evaluation.enabled);
  }

  log(`5. Rendering FlagsContextProvider`);
  return (
    <Context.Provider value={{ flagEnabled, flagsStorage }}>
      {children}
    </Context.Provider>
  );
};

export { FlagsContextProvider, Context };
