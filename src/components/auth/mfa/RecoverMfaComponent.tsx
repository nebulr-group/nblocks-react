import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { AlertComponent } from "../../shared/AlertComponent";
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
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await authService.resetUserMfaSetup(recoverCode);
      didRecoverMfaCode();
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg("Wrong recovery code, please try again.");
      } else {
        setErrorMsg(
          "There was an error when recovering. Try again, otherwise contact support."
        );
      }
      setRecoverCode("");
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
