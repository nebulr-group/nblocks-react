import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { UnauthenticatedError } from "../../../utils/errors/UnauthenticatedError";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

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
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
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
        setErrorMsg(t("Wrong security code, please try again."));
      } else {
        setErrorMsg(
          t(
            "There was an error when logging in. Try again, otherwise contact support."
          )
        );
      }
      setMfaCode("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="max-w-sm w-full mb-6">
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </div>
      )}
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        <InputComponent
          type="text"
          label={t("Secure code")}
          placeholder={t("Enter the secure code")}
          name="username"
          onChange={(event) => setMfaCode(event.target.value)}
          value={mfaCode}
        />
        {!setupMode && (
          <div className="flex justify-end">
            <LinkComponent
              to={RouteConfig.mfa.recoverMfaScreen}
              type="primary"
              className="font-semibold"
              size="sm"
            >
              {t("Use recover code?")}
            </LinkComponent>
          </div>
        )}
        <div>
          <NblocksButton
            submit={true}
            disabled={!mfaCode}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {t("Verify")}
          </NblocksButton>
        </div>
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type="secondary"
          size="sm"
          className="font-semibold"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { RequireMfaComponent };
