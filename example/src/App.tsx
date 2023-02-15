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
          appId: "633402fdf28d8e00252948b1",
        }}
      >
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
