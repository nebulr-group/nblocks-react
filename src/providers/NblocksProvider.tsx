import React, { FunctionComponent } from "react";
import { ConfigContextProvider, LibConfig } from "./ConfigProvider";
import { FlagsContextProvider } from "./FlagsProvider";
import { TokensContextProvider } from "./TokensProvider";
import { NblocksClientContextProvider } from "./NblocksClientProvider";
import { TokenRefresherComponent } from "../components/TokenRefresher";
import { AccessTokenLog } from "../components/AccessTokenLog";

/**
 * Wrap your code into this Provider to get access to the Nblocks world
 * @param param0
 * @returns
 */
const NblocksProvider: FunctionComponent<{
    config: Partial<LibConfig>;
    children: JSX.Element;
  }> = ({ children, config, }) => {
  
    if (config.debug) {
      console.log(`Nblocks: Beta - For app ${config.appId}`);
      // console.log(`1. Rendering NblocksProvider`);
    }

    return (
      <ConfigContextProvider config={config}>
        <NblocksClientContextProvider>
          <TokensContextProvider>
            <TokenRefresherComponent />
            { config.debug && (<AccessTokenLog/>) }
            <FlagsContextProvider>
              {children}
            </FlagsContextProvider>
          </TokensContextProvider>
        </NblocksClientContextProvider>
      </ConfigContextProvider>
    );
  };

  export {NblocksProvider}