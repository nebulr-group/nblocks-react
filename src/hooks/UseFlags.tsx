import { useContext } from 'react';
import { Context } from '../providers/FlagsProvider';

/** Must be within NblocksProvider ctx */
const useFlags = () => {

  const context = useContext(Context);
  if (!context) {
    throw new Error('useFlags must be used within a FlagsProvider');
  }
  return context;

};

export { useFlags };
