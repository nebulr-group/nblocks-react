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
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authService.resetUserMfaSetup(recoverCode);
      didRecoverMfaCode();
      setIsLoading(false);
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        setErrorMsg("Wrong recovery code, please try again.");
      } else {
        setErrorMsg(
          "There was an error when recovering. Try again, otherwise contact support."
        );
      }
      setIsLoading(false);
      setRecoverCode("");
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title="An error occured"
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
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
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            Reset
          </NblocksButton>
        </div>
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.LoginScreen}
          type="primary"
          className="font-semibold"
          size="sm"
        >
          Back to login
        </LinkComponent>
      </div>
    </>
  );
};

export { RecoverMfaComponent };
