import { useEffect, useState } from 'react';
import { useNblocksClient } from './UseNblocksClient';
import { BulkEvaluationResponse, FlagContext } from "@nebulr-group/nblocks-ts-client";
import { useTokensStorage } from './UseTokensStorage';
import { useLog } from './UseLog';

/** Must be within NblocksProvider ctx */
const useFlags = (context?: FlagContext) => {

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
      const response = await nblocksClient.flag.bulkEvaluate({context, accessToken});
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

  // Expose flagsStorage so listeners can pull new data when storage updates
  return {
    flagEnabled,
    flagsStorage
  };
};

export { useFlags };
