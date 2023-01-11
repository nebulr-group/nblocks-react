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
          appId: "633402fdf28d8e00252948b1",
          authLegacy: false,
        }}
      >
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
