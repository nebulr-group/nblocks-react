import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  didRecoverMfaCode: () => void;
};

const RecoverMfaComponent: FunctionComponent<ComponentProps> = ({
  didRecoverMfaCode,
}) => {
  const { authService } = useSecureContext();
  const [recoverCode, setRecoverCode] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    await authService.resetUserMfaSetup(recoverCode);
    didRecoverMfaCode();
  };

  return (
    <>
      <form onSubmit={(event) => submit(event)} className="space-y-6">
        <InputComponent
          type="password"
          label="Recovery code"
          placeholder="Enter your recovery code"
          name="username"
          onChange={(event) => setRecoverCode(event.target.value)}
          value={recoverCode}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!recoverCode}
            size="md"
            type="primary"
            fullWidth={true}
          >
            Reset
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

export { RecoverMfaComponent };
