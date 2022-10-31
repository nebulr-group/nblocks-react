import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  didSetupMfaCode: () => void;
};

const SetupMfaPhoneComponent: FunctionComponent<ComponentProps> = ({
  didSetupMfaCode,
}) => {
  const { authService } = useSecureContext();
  const [phoneNumber, setPhoneNumber] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.resetUserMfaSetup("1245");
    didSetupMfaCode();
  };

  return (
    <>
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
