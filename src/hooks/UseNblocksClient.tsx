import { NblocksPublicClient } from '@nebulr-group/nblocks-ts-client';
import { useEffect, useState } from 'react';
import { useConfig } from '../providers/ConfigProvider';
import { useLog } from './UseLog';

/** Must be within NblocksProvider ctx */
const useNblocksClient = () => {
  const [nblocksClient, setNblocksClient] = useState<
    NblocksPublicClient | undefined
  >();

  const { appId, debug, stage} = useConfig();
  const {log} = useLog();

  useEffect(() => {
    if (appId) {
      log('New NblocksPublicClient instanciated!');
      setNblocksClient(
        new NblocksPublicClient({
          appId,
          stage,
          debug
        }),
      );
    }
  }, [appId]);

  return {
    nblocksClient,
  };
};

export { useNblocksClient };
