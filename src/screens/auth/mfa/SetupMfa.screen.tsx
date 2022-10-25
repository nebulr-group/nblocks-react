import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupMfaComponent } from '../../../components/auth/mfa/SetupMfaComponent';
import { RouteConfig } from '../../../routes/AuthRoutes';

const SetupMfaScreen: FunctionComponent<{}> = () => {

  const navigate = useNavigate();

  const onDidSetupMfaCode = () => {
    navigate(RouteConfig.login.ChooseUserScreen);
  }

  return (
    <SetupMfaComponent didSetupMfaCode={() => onDidSetupMfaCode()}/>
  );
}

export {SetupMfaScreen};