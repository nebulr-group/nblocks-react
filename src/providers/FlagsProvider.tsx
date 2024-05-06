import React, { FunctionComponent, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useLog } from "../hooks/UseLog";
import { BulkEvaluationResponse, FlagContext } from "@nebulr-group/nblocks-ts-client";
import { useTokens } from "../hooks/UseTokens";
import { useRedirect } from "../hooks/UseRedirect";
import { useConfig } from "./ConfigProvider";

const FlagsContext = React.createContext<{ 
  /** Check if a given flag is enabled or not */
  flagEnabled: (flagKey: string) => boolean,
  /** Update user context. This operation issues a new bulk evaluation request */
  setContext: (ctx?: FlagContext) => void,
  /** Access to raw storage of all flags */
  flagsStorage: BulkEvaluationResponse | undefined,
} | undefined>(undefined);

const FlagsContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { nblocksClient } = useNblocksClient();
  const { restrictedTokenPath } = useRedirect();
  const { initialFlagsContext } = useConfig();
  const { log } = useLog();

  const [flagsStorage, setFlagsStorage] = useState<BulkEvaluationResponse | undefined>();

  const { accessToken } = useTokens();
  const [context, setContext] = useState<FlagContext | undefined>(initialFlagsContext);

  useEffect(() => {
    if (!restrictedTokenPath()) {
      doBulkEvaluation();
    } else {
      log(`Will not pull flags on current path`)
    }
  }, [accessToken, context]);

  const doBulkEvaluation = async () => {
    try {
      const response = await nblocksClient.flag.bulkEvaluate({ accessToken, context });
      log("Got new flags!");
      setFlagsStorage(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Checks if a specific flag is enabled via storage
  const flagEnabled = (flagKey: string) => {
    if (!flagsStorage)
      return false;

    return flagsStorage.flags.some(flag => flag.flag === flagKey && flag.evaluation.enabled);
  }

  // log(`5. Rendering FlagsContextProvider`);
  
  return (
    <FlagsContext.Provider value={{ flagEnabled, flagsStorage, setContext }}>
      {children}
    </FlagsContext.Provider>
  );
};

export { FlagsContextProvider, FlagsContext };
