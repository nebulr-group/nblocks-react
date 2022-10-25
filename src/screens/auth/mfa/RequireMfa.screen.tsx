import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequireMfaComponent } from '../../../components/auth/mfa/RequireMfaComponent';
import { RouteConfig } from '../../../routes/AuthRoutes';

const RequireMfaScreen: FunctionComponent<{}> = () => {

  const navigate = useNavigate();

  // Callback when the Component completed the heavylifting
  const onDidCommitMfaCode = () => {
    navigate(RouteConfig.login.ChooseUserScreen);
  }

  return (
    <RequireMfaComponent didCommitMfaCode={() => onDidCommitMfaCode()}/>
  )
}

export {RequireMfaScreen};
