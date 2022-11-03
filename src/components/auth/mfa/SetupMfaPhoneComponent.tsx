import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  didSetupPhoneNumber: () => void;
};

const SetupMfaPhoneComponent: FunctionComponent<ComponentProps> = ({
  didSetupPhoneNumber,
}) => {
  const { authService } = useSecureContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await authService.startMfaUserSetup(phoneNumber);
      didSetupPhoneNumber();
    } catch (error) {
      setErrorMsg(
        "There was an error when trying to setup your phone number. Try again and make sure you're using the correct format, otherwise contact support."
      );
      setPhoneNumber("");
    }
  };

  return (
    <>
      {errorMsg && (
        <AlertComponent
          type="danger"
          title="An error occured"
          messages={[errorMsg]}
        />
      )}
      <form onSubmit={(event) => submit(event)} className="space-y-6">
        <InputComponent
          type="text"
          label="Phone number"
          placeholder="+46..."
          name="phoneNumber"
          onChange={(event) => setPhoneNumber(event.target.value)}
          value={phoneNumber}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!phoneNumber}
            size="md"
            type="primary"
            fullWidth={true}
          >
            Submit
          </NblocksButton>
        </div>
      </form>
      <div>
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          size="sm"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { SetupMfaPhoneComponent };
