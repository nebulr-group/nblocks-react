import { NblocksProvider, InstallationCompleteComponent } from "nblocks-react";
import React from "react";

function App() {
  return (
    <div className="App">
      <NblocksProvider
        config={{
          debug: true,
          devMode: true,
          backendLess: true,
          authLegacy: false,
          accountApiBaseUri: "http://localhost:3010",
          oAuthBaseURI: "http://localhost:3070",
          apiHost: "http://localhost:3080",
          appId: "63cab2a305d778002d64212a",
        }}
      >
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
