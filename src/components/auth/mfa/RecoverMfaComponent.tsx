import React, { FunctionComponent } from 'react';
import { useSecureContext } from '../../../hooks/secure-http-context';

type ComponentProps = {
  didRecoverMfaCode: () => void;
}

const RecoverMfaComponent: FunctionComponent<ComponentProps> = ({didRecoverMfaCode}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.resetUserMfaSetup("1245");
    didRecoverMfaCode();
  }

  return (
    <div>
      <h1>RecoverMfaComponent</h1>
      <p>Clicking below will recover mfa using backup code "1234" for testing purposes</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Recover MFA code</button>
    </div>
  );
}

export {RecoverMfaComponent};
