import React from 'react';
import logo from './logo.svg';
import './App.css';
// @ts-ignore
import {NblocksProvider} from '@nebulr-group/nblocks-react-slim';

function App() {
  return (
    <NblocksProvider config={{appId: "65d773b06b6c37002211e090", debug: true, stage: 'DEV'}}>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
    </NblocksProvider>
  );
}

export default App;
