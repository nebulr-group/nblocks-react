import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecoverMfaComponent } from '../../../components/auth/mfa/RecoverMfaComponent';
import { RouteConfig } from '../../../routes/AuthRoutes';

const RecoverMfaScreen: FunctionComponent<{}> = () => {

  const navigate = useNavigate();

  const onDidRecoverMfaCode = () => {
    navigate(RouteConfig.mfa.SetupMfaScreen)
  }

  return (
    <RecoverMfaComponent didRecoverMfaCode={() => onDidRecoverMfaCode()}/>
  );
}

export {RecoverMfaScreen};
