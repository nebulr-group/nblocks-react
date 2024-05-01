import { useEffect, useState } from 'react';
import { useNblocksClient } from './UseNblocksClient';
import { Profile } from '@nebulr-group/nblocks-ts-client/dist/platform/auth/models/id-profile-context';
import { useTokens } from './UseTokens';

/** Must be within NblocksProvider ctx */
const useMe = () => {

  const { nblocksClient } = useNblocksClient();
  const { idToken } = useTokens();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    resolveProfile();
  }, [idToken]);

  const resolveProfile = async () => {
    try {
      if (idToken) {
        const p = await nblocksClient.auth.contextHelper.getProfileVerified(idToken);
        setProfile(p)
      }
    } catch (error) {}
  }

  return {
    profile,
  };
};

export { useMe };
