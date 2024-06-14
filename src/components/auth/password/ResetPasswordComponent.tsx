import { useSecureContext } from "../../../hooks/secure-http-context";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { RouteConfig } from "../../../routes/AuthRoutes";
import { InputComponent } from "../../shared/InputComponent";
import { LinkComponent } from "../../shared/LinkComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { AlertComponent } from "../../shared/AlertComponent";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";

type ComponentProps = {
  init?: string;
  didSendResetPasswordLink: (email: string) => void;
};

const ResetPasswordComponent: FunctionComponent<ComponentProps> = ({
  didSendResetPasswordLink,
  init,
}) => {
  const { authService } = useSecureContext();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (init) {
      setEmail(init);
    }
  }, [init]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await authService.sendResetPasswordLink(email);
      didSendResetPasswordLink(email);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        t(
          "There was an error when resetting the password. Try again, otherwise contact support."
        )
      );
      setEmail("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-sm w-full mb-6">
        <Transition
          show={!!errorMsg}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <AlertComponent
            type="danger"
            title={t("An error occured")}
            messages={[errorMsg]}
          />
        </Transition>
      </div>
      <form
        onSubmit={(event) => submit(event)}
        className="space-y-6 max-w-sm w-full"
      >
        <InputComponent
          type="email"
          label={t("Email address")}
          placeholder={t("Enter your email")}
          name="username"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <div>
          <NblocksButton
            submit={true}
            disabled={!email}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {t("Reset password")}
          </NblocksButton>
        </div>
      </form>
      <div className="mt-8">
        <LinkComponent
          to={RouteConfig.login.loginScreen}
          type={"secondary"}
          size="sm"
          className="font-semibold flex items-center"
        >
          <ArrowLeftIcon className="w-5 inline-block mr-1" />{" "}
          {t("Back to login")}
        </LinkComponent>
      </div>
    </>
  );
};

export { ResetPasswordComponent };
