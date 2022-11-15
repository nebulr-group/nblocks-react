import { useMutation, useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { GetAppConfigDocument } from "../../gql/graphql";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ModalComponent } from "../shared/ModalComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { KeyIcon } from "@heroicons/react/20/solid";
import { TextComponent } from "../shared/TextComponent";
import { InputComponent } from "../shared/InputComponent";
import { UpdateAppCredentialsDocument } from "../../gql/graphql";
import { AlertComponent, ComponentProps } from "../shared/AlertComponent";

const ConfigComponent: FunctionComponent<{}> = ({}) => {
  const [alert, setAlert] = useState<ComponentProps & { show: boolean }>({
    title: "",
    type: "primary",
    messages: [""],
    onCloseClick: (event) => {
      setAlert((value) => {
        return { ...value, show: false };
      });
    },
    show: false,
  });

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert((value) => {
          return { ...value, show: false };
        });
      }, 5000);
    }
  }, [alert.show]);

  const { data, loading, error } = useQuery(GetAppConfigDocument);
  const [updateCredentialsMutation, updateAppCredentialsData] = useMutation(
    UpdateAppCredentialsDocument
  );
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [stripeSecretKey, setStripePrivateKey] = useState<string>("");
  const [stripePublicKey, setStripePublicKey] = useState<string>("");

  const onSubmitStripeCredentialsHandler: React.FormEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    await updateCredentialsMutation({
      variables: { credentials: { stripePublicKey, stripeSecretKey } },
    });
    // Toast & Loading logic
    setCredentialsModalOpen(false);
    setAlert((value) => {
      return {
        ...value,
        title: "Stripe Credentials Updated!",
        show: true,
        type: "success",
        messages: [`Your Stripe credentials have been successfully updated.`],
      };
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <HeadingComponent type="h1" size="4xl">
          Application Details
        </HeadingComponent>
      </div>
      <div className="space-y-4 py-8">
        <div>
          <HeadingComponent type={"h2"} size="xl">
            Application ID
          </HeadingComponent>
          <TextComponent className="mt-2">
            {data?.getAppConfig.id}
          </TextComponent>
        </div>
        <hr />
        <div>
          <HeadingComponent type={"h2"} size="xl">
            Name
          </HeadingComponent>
          <TextComponent className="mt-2">
            {data?.getAppConfig.name}
          </TextComponent>
        </div>
        <hr />
        <div>
          <HeadingComponent type={"h2"} size="xl">
            User roles
          </HeadingComponent>
          <ul className="list-none inline-block mt-2">
            {data?.getAppConfig.roles?.map((role, index) => (
              <li className="py-3" key={index}>
                {role}{" "}
                {role === data.getAppConfig.defaultRole ? "(Default)" : ""}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div>
          <HeadingComponent type={"h2"} size="xl">
            Plans
          </HeadingComponent>
          <ul className="list-none mt-2">
            {data?.getAppConfig.businessModel?.plans.map((plan, i) => (
              <li key={i}>
                {plan.name} -{" "}
                {plan.prices.map((price, j) => (
                  <i key={j}>
                    {price.currency} {price.amount} ({price.region}),{" "}
                  </i>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <HeadingComponent type="h2" size="2xl">
          Stripe Credentials
        </HeadingComponent>
        <NblocksButton
          type={"primary"}
          size={"lg"}
          className={"mt-2"}
          onClick={() => {
            setCredentialsModalOpen(true);
          }}
        >
          Update credentials
        </NblocksButton>
        <ModalComponent
          isOpen={credentialsModalOpen}
          setIsOpen={setCredentialsModalOpen}
          heading={"Stripe Credentials"}
          description={"Enter your Stripe keys."}
          icon={<KeyIcon />}
        >
          <form className="mt-5" onSubmit={onSubmitStripeCredentialsHandler}>
            <div className="space-y-2.5">
              <InputComponent
                type={"password"}
                label={"Stripe Publishable Key"}
                onChange={(event) => {
                  setStripePublicKey(event.target.value);
                }}
                value={stripePublicKey}
              />
              <InputComponent
                type={"password"}
                label={"Stripe Secret Key"}
                onChange={(event) => {
                  setStripePrivateKey(event.target.value);
                }}
                value={stripeSecretKey}
              />
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-3">
              <NblocksButton
                size="md"
                className="w-full"
                type="tertiary"
                onClick={() => setCredentialsModalOpen(false)}
              >
                Cancel
              </NblocksButton>
              <NblocksButton
                submit={true}
                size="md"
                isLoading={updateAppCredentialsData.loading}
                className="w-full"
                type="primary"
              >
                Save changes
              </NblocksButton>
            </div>
          </form>
        </ModalComponent>
      </div>
      {/* Alert component logic should be moved to context provider or root component which will expose the state setter and context */}
      {alert.show && (
        <AlertComponent
          title={alert.title}
          type={alert.type}
          className="fixed bottom-4 right-4 z-50 max-w-md w-full"
          messages={alert.messages}
          closable={true}
          onCloseClick={alert.onCloseClick}
        ></AlertComponent>
      )}
    </div>
  );
};

export { ConfigComponent };
