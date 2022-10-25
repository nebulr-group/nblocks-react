import React, { FunctionComponent } from 'react';
import { useSecureContext } from '../../../hooks/secure-http-context';

type ComponentProps = {
  didSetupMfaCode: () => void;
}

const SetupMfaComponent: FunctionComponent<ComponentProps> = ({didSetupMfaCode}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.resetUserMfaSetup("1245");
    didSetupMfaCode();
  }

  return (
    <div>
      <h1>SetupMfaComponent</h1>
      <p>Clicking below will simulate setup mfa code</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Setup MFA code</button>
    </div>
  );
}

export {SetupMfaComponent};
