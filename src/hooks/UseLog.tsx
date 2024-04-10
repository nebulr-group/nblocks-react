import { useConfig } from '../providers/ConfigProvider';

/** Must be within NblocksProvider ctx */
const useLog = () => {

  const { debug } = useConfig();

  const log = (msg: string) => {
    if (debug) {
      console.log(`Nblocks: ${msg}`);
    }
  }

  return {
    log,
  };
};

export { useLog };
