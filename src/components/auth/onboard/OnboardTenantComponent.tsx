import { useMutation, useQuery } from "@apollo/client";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { GetTenantDocument, UpdateTenantDocument } from "../../../gql/graphql";
import { AlertComponent } from "../../shared/AlertComponent";
import { InputComponent } from "../../shared/InputComponent";
import { NblocksButton } from "../../shared/NblocksButton";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  didCompleteOnboarding: () => void;
};

const OnboardTenantComponent: FunctionComponent<ComponentProps> = ({
  didCompleteOnboarding,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("");
  const [logo, setLogo] = useState("");
  const { t } = useTranslation();

  const { data, loading, error } = useQuery(GetTenantDocument);
  const [updateTenantMutation, updateTenantData] =
    useMutation(UpdateTenantDocument);

  useEffect(() => {
    if (data && data.getTenant) {
      const tenant = data.getTenant;
      setName(tenant.name);
      setLocale(tenant.locale ? tenant.locale : "");
      setLogo(tenant.logo);
    }
  }, [data]);

  const isLoading = loading || updateTenantData.loading;
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await updateTenantMutation({
        variables: { tenant: { name, locale } },
      });
      didCompleteOnboarding();
    } catch (error) {
      setErrorMsg(
        t(
          "There was an error when updating your workspace. Try again, otherwise contact support."
        )
      );
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
          label={t("Name")}
          placeholder={t("Enter a workspace name")}
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
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

export { OnboardTenantComponent };
