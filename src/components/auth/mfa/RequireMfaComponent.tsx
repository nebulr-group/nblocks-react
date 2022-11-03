import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";

type ComponentProps = {
  /** Setup mode will call a different API endpoint which is used when setting up MFA (optional) */
  setupMode?: boolean;
  /** Callback when user completed input. If setupMode is `true` a recover code will be provided in the callback */
  didCommitMfaCode: (recoverCode?: string) => void;
};

const RequireMfaComponent: FunctionComponent<ComponentProps> = ({
  didCommitMfaCode,
  setupMode,
}) => {
  const { authService } = useSecureContext();
  const [mfaCode, setMfaCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    let recoverCode = undefined;
    try {
      if (setupMode) {
        recoverCode = await authService.finishMfaUserSetup(mfaCode);
      } else {
        await authService.commitMfaCode(mfaCode);
      }
      didCommitMfaCode(recoverCode);
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg("Wrong security code, please try again.");
      } else {
        setErrorMsg(
          "There was an error when logging in. Try again, otherwise contact support."
        );
      }
      setMfaCode("");
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
          label="Secure code"
          placeholder="Enter the secure code"
          name="username"
          onChange={(event) => setMfaCode(event.target.value)}
          value={mfaCode}
        />
        {!setupMode && (
          <div className="flex justify-end">
            <LinkComponent
              to={RouteConfig.mfa.RecoverMfaScreen}
              type="primary"
              size="sm"
            >
              Use recover code?
            </LinkComponent>
          </div>
        )}
        <div>
          <NblocksButton
            submit={true}
            disabled={!mfaCode}
            size="md"
            type="primary"
            fullWidth={true}
          >
            Verify
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

export { RequireMfaComponent };
