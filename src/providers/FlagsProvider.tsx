import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNblocksClient } from "../hooks/UseNblocksClient";
import { useTokensStorage } from "../hooks/UseTokensStorage";
import { useLog } from "../hooks/UseLog";
import { BulkEvaluationResponse } from "@nebulr-group/nblocks-ts-client";

const Context = React.createContext<{ flagEnabled: (flagKey: string) => boolean, flagsStorage: BulkEvaluationResponse | undefined } | undefined>(undefined);

const FlagsContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {

  const {nblocksClient} = useNblocksClient();
  const {getAccessToken} = useTokensStorage();
  const { log } = useLog();
  const [flagsStorage, setFlagsStorage] = useState<BulkEvaluationResponse | undefined>();

  useEffect(() => {
    doBulkEvaluation();
  }, [nblocksClient]);

  const doBulkEvaluation = async () => {
    if (nblocksClient) {
      const accessToken = getAccessToken();
      const response = await nblocksClient.flag.bulkEvaluate({accessToken});
      log("Got new flags!");
      setFlagsStorage(response);
    }
  }

  // Checks if a specific flag is enabled via storage
  const flagEnabled = (flagKey: string) => {
    if (!flagsStorage)
      return false;

    return flagsStorage.flags.some( flag => flag.flag === flagKey && flag.evaluation.enabled);
  }

  return (
    <Context.Provider value={{ flagEnabled, flagsStorage }}>
      {children}
    </Context.Provider>
  );
};

export { FlagsContextProvider, Context };
