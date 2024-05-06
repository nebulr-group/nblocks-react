import './App.css';
import { NblocksProvider, LibConfig } from '@nebulr-group/nblocks-react';
import AppRoutes from './AppRoutes';

const config: Partial<LibConfig> = {
  appId: "65d773b06b6c37002211e090",
  stage: "DEV",
  // appId: "605b603cfeb49f00082686b6",
  // stage: "STAGE",
  debug: true, 
  initialFlagsContext: { device: { key: "android" } }
  // disableRedirects: true
}

function App() {
  return (
    <NblocksProvider config={config}>
      <AppRoutes />
    </NblocksProvider>
  );
}

export { App, config };
