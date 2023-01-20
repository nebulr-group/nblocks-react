import { useMutation, useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import { GetAppConfigDocument, GetTenantDocument } from "../../gql/graphql";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ModalComponent } from "../shared/ModalComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { TextComponent } from "../shared/TextComponent";
import { InputComponent } from "../shared/InputComponent";
import { UpdateAppCredentialsDocument } from "../../gql/graphql";
import { AlertComponent, ComponentProps } from "../shared/AlertComponent";
import { SkeletonLoader } from "../shared/SkeletonLoader";
import { RouteConfig } from "../../routes/AuthRoutes";
import { LinkComponent } from "../shared/LinkComponent";
import { ChipComponent } from "../shared/ChipComponent";

const ConfigComponent: FunctionComponent<{}> = ({}) => {
  const [stripeFormIsValid, setStripeFormIsValid] = useState<boolean>(false);
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
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [stripeSecretKey, setStripePrivateKey] = useState<string>("");
  const [stripePublicKey, setStripePublicKey] = useState<string>("");
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

  const buildCloudLink = (planName: string, regionName: string) => {
    return `https://account-api-stage.nebulr-core.com/app/${data?.getAppConfig.id}/checkoutView?plan=${planName}&region=${regionName}`;
  };

  const buildLocalLink = (planName: string) => {
    const appUiURL = data?.getAppConfig.uiUrl;
    const signupRoute = RouteConfig.tenant.signupScreen;
    return `${appUiURL}${signupRoute}/${planName}`;
  };

  let planData = data?.getAppConfig
    ? data.getAppConfig.businessModel?.plans
    : [];
  console.log(planData);
  const onSubmitStripeCredentialsHandler: React.FormEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    await updateCredentialsMutation({
      variables: { credentials: { stripePublicKey, stripeSecretKey } },
      refetchQueries: [{ query: GetAppConfigDocument }],
    });
    // Toast & Loading logic
    setCredentialsModalOpen(false);
    setStripePublicKey("");
    setStripePrivateKey("");
    setStripeFormIsValid(false);
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
    <div className="container pb-11 pt-6">
      <div>
        <HeadingComponent type="h1" size="2xl" className="font-bold">
          Application Details
        </HeadingComponent>
        <div>
          <TextComponent className="inline-block text-gray-500 mr-2 mt-1">
            Change any of the properties on this page in your backend projec in
            the <b>'app-configuration.json'</b> file located in the{" "}
            <b>'nblocks/config'</b> folder.
          </TextComponent>
          <LinkComponent
            type={"primary"}
            to={
              "https://nebulr-group.github.io/nblocks-docs/docs/essentials/first-branding"
            }
            nativeBehavior={true}
            className={"font-bold inline-block"}
            target={"_blank"}
          >
            Read more in docs
          </LinkComponent>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-baseline">
          <HeadingComponent
            type={"h2"}
            size="xl"
            className="font-semibold mr-2"
          >
            Application ID
          </HeadingComponent>
          {data ? (
            <TextComponent>{data.getAppConfig.id}</TextComponent>
          ) : (
            <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
          )}
        </div>
        <div className="flex items-baseline mt-5">
          <HeadingComponent
            type={"h2"}
            size="xl"
            className="font-semibold mr-2"
          >
            Name
          </HeadingComponent>
          {data ? (
            <TextComponent>{data?.getAppConfig.name}</TextComponent>
          ) : (
            <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
          )}
        </div>
        <div className="mt-12">
          <HeadingComponent type={"h2"} size="xl" className="font-semibold">
            User roles
          </HeadingComponent>
          <TextComponent
            className="font-semibold mt-6 py-3 pl-4 border-b-2 bg-gray-50"
            size="sm"
          >
            Role Name
          </TextComponent>
          {data ? (
            <ul className="list-none inline-block mt-2 w-full">
              {data?.getAppConfig.roles?.map((role, index) => (
                <li
                  className="py-6 px-4 border-b last:border-b-0 block"
                  key={index}
                >
                  {role}{" "}
                  {role === data.getAppConfig.defaultRole ? "(Default)" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
            </>
          )}
        </div>
        <div className="bg-white mt-12">
          <div className="w-full">
            <HeadingComponent type={"h2"} size="xl" className="font-bold mt-6">
              Plans
            </HeadingComponent>
            <table className="table-auto mt-6 w-full">
              <thead className="bg-gray-50 border-b-2 w-full">
                <tr className="text-start">
                  <th className="pl-6 py-3 font-semibold text-start">
                    Plan Name
                  </th>
                  <th className="pl-6 py-3 font-semibold text-start">Amount</th>
                  <th className="pl-6 py-3 font-semibold text-start">
                    Currency
                  </th>
                  <th className="pl-6 py-3 font-semibold text-start">Region</th>
                  <th className="pl-6 py-3 font-semibold text-start">
                    Quick link to In-app Plan Sign Up
                  </th>
                  <th className="pl-6 py-3 font-semibold text-start">
                    Quick link to Nblocks Cloud Cloud Plan Sign Up
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {planData?.map((plan) => {
                  return (
                    <tr className="border-b">
                      <td className="font-semibold align-top text-start">
                        <div className="py-7">{plan.name}</div>
                      </td>
                      <td>
                        {plan.prices.map((price) => {
                          return (
                            <div className="py-7 text-gray-600">
                              {price.amount}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {plan.prices.map((price) => {
                          return (
                            <div className="py-7 text-gray-600">
                              {price.currency}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {plan.prices.map((price) => {
                          return (
                            <div className="py-7 text-gray-600">
                              {price.region}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {plan.prices.map((price) => {
                          return (
                            <div className="py-7">
                              <LinkComponent
                                type={"primary"}
                                to={buildLocalLink(plan.name)}
                                className={"block font-semibold"}
                                nativeBehavior={true}
                                target={"_blank"}
                              >
                                Link
                              </LinkComponent>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {plan.prices.map((price) => {
                          return (
                            <div className="py-7">
                              <LinkComponent
                                type={"primary"}
                                to={buildCloudLink(plan.name, price.region)}
                                className={"block font-semibold"}
                                nativeBehavior={true}
                                target={"_blank"}
                              >
                                Link
                              </LinkComponent>
                            </div>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <HeadingComponent type="h2" size="2xl" className="font-bold">
          Stripe Credentials
        </HeadingComponent>
        <div className="flex mt-5">
          <TextComponent className="font-semibold mr-2">Status</TextComponent>
          <ChipComponent
            type={data?.getAppConfig.stripeEnabled ? "success" : "tertiary"}
            icon={
              <span
                className={`rounded-full mr-1 w-1.5 h-1.5${
                  data?.getAppConfig.stripeEnabled
                    ? " bg-green-500"
                    : " bg-gray-500"
                }`}
              ></span>
            }
          >
            {data?.getAppConfig.stripeEnabled
              ? "Credentials up to date"
              : "No Credentials"}
          </ChipComponent>
        </div>
        <NblocksButton
          type={"primary"}
          size={"lg"}
          className={"mt-6"}
          onClick={() => {
            setCredentialsModalOpen(true);
          }}
        >
          Update credentials
        </NblocksButton>
        <ModalComponent
          isOpen={credentialsModalOpen}
          setIsOpen={setCredentialsModalOpen}
          heading={"Update credentials"}
          description={
            "Add your Strie credentials to be able to connect your Stripe account to Nblocks."
          }
        >
          <form className="mt-5" onSubmit={onSubmitStripeCredentialsHandler}>
            <div className="space-y-2.5">
              <InputComponent
                type={"password"}
                label={"Stripe Publishable Key"}
                onChange={(event) => {
                  if (event.target.value.length > 0) {
                    setStripeFormIsValid(true);
                  } else {
                    setStripeFormIsValid(false);
                  }

                  setStripePublicKey(event.target.value);
                }}
                value={stripePublicKey}
                placeholder={"Enter your Stripe key."}
              />
              <InputComponent
                type={"password"}
                label={"Stripe Secret Key"}
                onChange={(event) => {
                  if (event.target.value.length > 0) {
                    setStripeFormIsValid(true);
                  } else {
                    setStripeFormIsValid(false);
                  }

                  setStripePrivateKey(event.target.value);
                }}
                value={stripeSecretKey}
                placeholder={"Enter your Stripe key."}
              />
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-8 gap-3">
              <NblocksButton
                size="md"
                className="w-full"
                type="tertiary"
                onClick={() => {
                  setCredentialsModalOpen(false);
                }}
              >
                Cancel
              </NblocksButton>
              <NblocksButton
                submit={true}
                size="md"
                isLoading={updateAppCredentialsData.loading}
                className="w-full"
                type="primary"
                disabled={!stripeFormIsValid}
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
