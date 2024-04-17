import { useContext } from 'react';
import { Context } from '../providers/NblocksClientProvider';

/** Must be within NblocksProvider ctx */
const useNblocksClient = () => {

  const context = useContext(Context);
  if (!context) {
    throw new Error('useNblocksClient must be used within a NblocksClientContextProvider');
  }
  return context;
};

export { useNblocksClient };
