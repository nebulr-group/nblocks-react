import React, { FunctionComponent } from "react";

type ComponentProps = {
  didCompleteOnboarding: () => void
}

const OnboardTenantComponent: FunctionComponent<ComponentProps> = ({didCompleteOnboarding}) => {

  const submit = async () => {
    didCompleteOnboarding();
  }

  return (
    <div>
      <h1>OnboardTenantComponent</h1>
      <p>Clicking below will simulate onboarding of a workspace updating the tenant name and language</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => submit()}>Update info</button>
    </div>
  )
}

export {OnboardTenantComponent}