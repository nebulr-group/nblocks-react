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
          appId: "63243486feaaae0022865fb2",
          authLegacy: false,
        }}
      >
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
