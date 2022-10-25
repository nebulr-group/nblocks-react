import React, { FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OnboardUserComponent } from '../../components/auth/onboard/OnboardUserComponent';
import { useConfig } from '../../hooks/config-context';

// TODO add support for pulling current user data + redirect to tenant onboarding if that is missing
const OnboardUserScreen: FunctionComponent<{}> = () => {

  const {debug, handoverRoute} = useConfig();
  const navigate = useNavigate();
  const location = useLocation();

  // Handover will be done to handoverRoute or targetUrl if specified
  const targetUrl = location.state?.targetUrl?.pathname || handoverRoute;

  const onDidCompleteOnboarding = () => {
    navigate(targetUrl);
  }

  const log = (msg:string) => {
    if (debug) {
      console.log(msg);
    }
  }

  return (
    <OnboardUserComponent didCompleteOnboarding={() => onDidCompleteOnboarding()}/>
  )
}

export {OnboardUserScreen};
