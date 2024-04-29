import { useConfig } from "./config-context";

const doLog = (msg: string, ...optionalParams: any[]) => {
  console.log(
    `Nblocks: ${new Date().toISOString()} - ${msg}`,
    ...optionalParams
  );
};

/** Must be within NblocksProvider ctx */
const useLog = () => {
  const { debug } = useConfig();

  const log = (msg: string, emphesize?: boolean) => {
    if (debug) {
      if (emphesize) {
        console.log(`#######################`);
        doLog(`Nblocks: ${new Date().toISOString()} - ${msg}`);
        console.log(`#######################`);
      } else {
        console.log(`Nblocks: ${new Date().toISOString()} - ${msg}`);
      }
    }
  };

  const logError = (...data: any[]) => {
    if (debug) {
      console.error(`Nblocks: ${new Date().toISOString()} - Error!`);
      console.error(data);
    }
  };

  return {
    log,
    logError,
  };
};

export { useLog, doLog };
