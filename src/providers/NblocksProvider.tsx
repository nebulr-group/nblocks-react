import React, { FunctionComponent } from "react";
import { ConfigContextProvider, LibConfig } from "./ConfigProvider";
import { TokenRefresherComponent } from "../components/TokenRefresher";

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
    }
  
    return (
      <ConfigContextProvider config={config}>
        <TokenRefresherComponent />
        {children}
      </ConfigContextProvider>
    );
  };

  export {NblocksProvider}