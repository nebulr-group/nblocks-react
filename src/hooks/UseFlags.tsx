import { useContext } from 'react';
import { FlagsContext } from '../providers/FlagsProvider';

/** Must be within NblocksProvider ctx */
const useFlags = () => {

  const context = useContext(FlagsContext);
  if (!context) {
    throw new Error('useFlags must be used within a FlagsProvider');
  }
  return context;

};

export { useFlags };
