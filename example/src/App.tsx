import { NblocksProvider, InstallationCompleteComponent } from "nblocks-react";
import React from "react";

function App() {
  return (
    <div className="App">
      <NblocksProvider
        config={{ debug: true, devMode: true, backendLess: true }}
      >
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
