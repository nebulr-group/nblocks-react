import React, { FunctionComponent } from 'react';
import { useSecureContext } from '../../../hooks/secure-http-context';

type ComponentProps = {
  didCommitMfaCode: () => void;
}

const RequireMfaComponent: FunctionComponent<ComponentProps> = ({didCommitMfaCode}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.commitMfaCode("1245");
    didCommitMfaCode();
  }

  return (
    <div>
      <h1>RequireMfaComponent</h1>
      <p>Clicking below will commit a mfa code "1234" for testing purposes</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Commit MFA code</button>
    </div>
  )
}

export {RequireMfaComponent};
