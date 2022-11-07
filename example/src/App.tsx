import { NblocksProvider, InstallationCompleteComponent } from "nblocks-react";
import React from "react";
import { HomeScreen } from "./screens/Home.screen";

function App() {
  return (
    <div className="App">
      <NblocksProvider config={{ debug: true, devMode: true }}>
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <InstallationCompleteComponent />
        </header>
      </NblocksProvider>
    </div>
  );
}

export default App;
