import { FunctionComponent, useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { PasskeysLoginButtonComponent } from "../shared/PasskeysLoginButtonComponent";

type ComponentProps = {
  didSetPasskeys: () => void;
  resetToken: string;
};

const SetPasskeysComponent: FunctionComponent<ComponentProps> = ({
  didSetPasskeys,
  resetToken,
}) => {
  const { authService } = useSecureContext();
  const [loading, setLoading] = useState(false);

  const registerPasskeys = async () => {
    try {
      setLoading(true);
      const regOptions =
        await authService._oauthService?.getPasskeysRegistrationOptions(
          resetToken
        );
      if (regOptions) {
        const registrationResponse = await startRegistration(regOptions);
        const verifyResponse =
          await authService._oauthService?.passkeysVerifyRegistration(
            registrationResponse,
            resetToken
          );

        if (verifyResponse?.verified) {
          didSetPasskeys();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PasskeysLoginButtonComponent
        mode="create"
        onClick={() => registerPasskeys()}
        loading={loading}
      ></PasskeysLoginButtonComponent>
    </>
  );
};

export { SetPasskeysComponent };
