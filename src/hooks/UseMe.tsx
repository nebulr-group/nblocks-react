import { useEffect, useState } from 'react';
import { useNblocksClient } from './UseNblocksClient';
import { useTokensStorage } from './UseTokensStorage';
import { Profile } from '@nebulr-group/nblocks-ts-client/dist/platform/auth/models/id-profile-context';

/** Must be within NblocksProvider ctx */
const useMe = () => {

  const { nblocksClient } = useNblocksClient();
  const { getIdToken } = useTokensStorage();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    resolveProfile();
  }, [nblocksClient]);

  const resolveProfile = async () => {
    if (nblocksClient) {
      const idToken = getIdToken();
      if (idToken) {
        const p = await nblocksClient.auth.contextHelper.getProfileVerified(idToken);
        setProfile(p)
      }
    }
  }

  return {
    profile,
  };
};

export { useMe };
