import { useSecureContext } from "../../../hooks/secure-http-context";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../../../hooks/auth-context";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  didCompleteOnboarding: () => void;
};

const OnboardUserComponent: FunctionComponent<ComponentProps> = ({
  didCompleteOnboarding,
}) => {
  const { authService } = useSecureContext();
  const { currentUser } = useAuth();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser && currentUser.user) {
      const names = splitFullName(currentUser.user?.fullName);
      setFirstName(names.firstName);
      setLastName(names.lastName);
      //setPhoneNumber(currentUser.user.)
    }
  }, [currentUser]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await authService.updateCurrentUser({
        consentsToPrivacyPolicy: true,
        firstName,
        lastName,
      });
      didCompleteOnboarding();
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(
        t(
          "There was an error when updating your profile. Try again, otherwise contact support."
        )
      );
      setIsLoading(false);
    }
  };

  /**
   * We should return firstname and lastname from API but for now we're solving this using split() on fullname.
   * @param fullName
   * @returns { firstName: string; lastName: string }
   */
  const splitFullName = (
    fullName?: string
  ): { firstName: string; lastName: string } => {
    if (!fullName) {
      return { firstName: "", lastName: "" };
    }
    const names = fullName.split(" ");
    const firstName = names[0];
    const lastName = names.length > 1 ? names[1] : "";
    return { firstName, lastName };
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
          label={t("First name")}
          placeholder={t("Enter your first name")}
          name="firstName"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <InputComponent
          type="text"
          label={t("Last name")}
          placeholder={t("Enter your last name")}
          name="lastName"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
        <div>
          <NblocksButton
            submit={true}
            size="md"
            isLoading={isLoading}
            type="primary"
            fullWidth={true}
          >
            {t("Save")}
          </NblocksButton>
        </div>
      </form>
    </>
  );
};

export { OnboardUserComponent };
