import {
  NblocksProvider,
  InstallationCompleteComponent,
  TabsComponent,
} from "nblocks-react";
import React from "react";

function App() {
  return (
    <div className="App">
      <NblocksProvider config={{ debug: true, devMode: true }}>
        <InstallationCompleteComponent />
      </NblocksProvider>
    </div>
  );
}

export default App;
