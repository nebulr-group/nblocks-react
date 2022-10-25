import { useSecureContext } from "../../../hooks/secure-http-context";
import React, { FunctionComponent } from "react";

type ComponentProps = {
  didCompleteOnboarding: () => void
}

const OnboardUserComponent: FunctionComponent<ComponentProps> = ({didCompleteOnboarding}) => {

  const {authService} = useSecureContext();

  const submit = async () => {
    await authService.updateCurrentUser({consentsToPrivacyPolicy: true, firstName: "Oscar", lastName: "Söderlund", phoneNumber: "+46702892820"})
    didCompleteOnboarding();
  }

  return (
    <div>
      <h1>OnboardUserComponent</h1>
      <p>Clicking below will simulate onboarding of a user with first name, lastname + phonenumber and accepting privacy policy</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Update info</button>
    </div>
  )
}

export {OnboardUserComponent}