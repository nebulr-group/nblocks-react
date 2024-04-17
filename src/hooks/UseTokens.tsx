import { useContext } from 'react';
import { Context } from '../providers/TokensProvider';

/** Must be within TokensProvider ctx */
const useTokens = () => {

  const context = useContext(Context);
  if (!context) {
    throw new Error('usTokens must be used within a TokensProvider');
  }
  return context;

};

export { useTokens };
