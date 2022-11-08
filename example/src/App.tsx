import { NblocksProvider, InstallationCompleteComponent } from "nblocks-react";
import React from "react";
import { HomeScreen } from "./screens/Home.screen";

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
