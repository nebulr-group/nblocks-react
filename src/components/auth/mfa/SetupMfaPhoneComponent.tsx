import React, { FormEvent, FunctionComponent, useState } from "react";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  didSetupPhoneNumber: () => void;
};

const SetupMfaPhoneComponent: FunctionComponent<ComponentProps> = ({
  didSetupPhoneNumber,
}) => {
  const { authService } = useSecureContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await authService.startMfaUserSetup(phoneNumber);
      didSetupPhoneNumber();
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        t(
          "There was an error when trying to setup your phone number. Try again and make sure you're using the correct format, otherwise contact support."
        )
      );
      setIsLoading(false);
      setPhoneNumber("");
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
          label={t("Phone number")}
          placeholder={t("+46...")}
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
            isLoading={isLoading}
            fullWidth={true}
          >
            {t("Submit")}
          </NblocksButton>
        </div>
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type="secondary"
          className="font-semibold"
          size="sm"
        >
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { SetupMfaPhoneComponent };
