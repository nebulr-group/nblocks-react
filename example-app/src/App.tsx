import './App.css';
// @ts-ignore
import { NblocksProvider } from '@nebulr-group/nblocks-react-slim';
import AppRoutes from './AppRoutes';

const config = {
  appId: "65d773b06b6c37002211e090",
  debug: true, 
  stage: 'DEV', 
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
