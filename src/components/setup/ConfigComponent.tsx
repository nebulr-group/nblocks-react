import { useMutation, useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  GetAppConfigDocument,
  GetTenantDocument,
  PlanGraphql,
  PriceGraphql,
} from "../../gql/graphql";
import { HeadingComponent } from "../shared/HeadingComponent";
import { ModalComponent } from "../shared/ModalComponent";
import { NblocksButton } from "../shared/NblocksButton";
import { KeyIcon } from "@heroicons/react/20/solid";
import { TextComponent } from "../shared/TextComponent";
import { InputComponent } from "../shared/InputComponent";
import { UpdateAppCredentialsDocument } from "../../gql/graphql";
import { AlertComponent, ComponentProps } from "../shared/AlertComponent";
import { SkeletonLoader } from "../shared/SkeletonLoader";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
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
  const {
    data: userData,
    loading: loadingUserData,
    error: userError,
  } = useQuery(GetTenantDocument);
  const [updateCredentialsMutation, updateAppCredentialsData] = useMutation(
    UpdateAppCredentialsDocument
  );

  const columnHelper = createColumnHelper<PlanGraphql>();

  const buildCloudLink = (row: Row<PlanGraphql>, regionName: string) => {
    const planName = row.getValue<string>("name");
    return `https://account-api-stage.nebulr-core.com/app/${data?.getAppConfig.id}/checkoutView?plan=${planName}&region=${regionName}`;
  };

  const buildLocalLink = (row: Row<PlanGraphql>) => {
    const appUiURL = data?.getAppConfig.uiUrl;
    const signupRoute = RouteConfig.setup.signup;
    return `${appUiURL}${signupRoute}/${row.getValue("name")}`;
  };

  const columns = [
    columnHelper.group({
      header: "Plan Name",
      columns: [
        columnHelper.accessor("name", {
          header: "",
          cell: (info) => info.getValue(),
        }),
      ],
    }),
    columnHelper.group({
      header: "Prices",

      columns: [
        columnHelper.accessor("prices", {
          header: "Amount",
          id: "amount",
          cell: (info) => {
            return info.cell.getValue<PriceGraphql[]>().map((price) => {
              return (
                <div className="pt-2 first:pt-0 border-b last:border-b-0">
                  {price.amount}
                </div>
              );
            });
          },
        }),
        columnHelper.accessor("prices", {
          header: "Currency",
          id: "currency",
          cell: (info) => {
            return info.cell.getValue<PriceGraphql[]>().map((price) => {
              return (
                <div className="pt-2 first:pt-0 border-b last:border-b-0">
                  {price.currency}
                </div>
              );
            });
          },
        }),
        columnHelper.accessor("prices", {
          header: "Region",
          id: "region",
          cell: (info) => {
            return info.cell.getValue<PriceGraphql[]>().map((price) => {
              return (
                <div className="pt-2 first:pt-0 border-b last:border-b-0">
                  {price.region}
                </div>
              );
            });
          },
        }),
      ],
    }),
    columnHelper.group({
      header: "Quick Links",
      columns: [
        columnHelper.display({
          header: "In-app Plan Sign Up",
          id: "in-app-link",
          cell: (info) => {
            return (
              <>
                {info.row.getValue<PriceGraphql[]>("region").map((price) => {
                  return (
                    <div className="pt-2 first:pt-0 border-b last:border-b-0 text-center">
                      <LinkComponent
                        to={buildLocalLink(info.row)}
                        target={"_blank"}
                        nativeBehavior={true}
                        type={"primary"}
                        className={"block"}
                      >
                        {buildLocalLink(info.row)}
                      </LinkComponent>
                    </div>
                  );
                })}
              </>
            );
          },
        }),
        columnHelper.display({
          header: "Nblocks Cloud Plan Sign Up",
          id: "nblocks-cloud-link",
          cell: (info) => {
            return (
              <>
                {info.row.getValue<PriceGraphql[]>("region").map((price) => {
                  return (
                    <div className="pt-2 first:pt-0 border-b last:border-b-0 text-center">
                      <LinkComponent
                        to={buildCloudLink(info.row, price.region)}
                        type={"primary"}
                        nativeBehavior={true}
                        target={"_blank"}
                        className={"block"}
                      >
                        Link
                      </LinkComponent>
                    </div>
                  );
                })}
              </>
            );
          },
        }),
      ],
    }),
  ];

  let planData = data?.getAppConfig
    ? data.getAppConfig.businessModel?.plans
    : [];

  const table = useReactTable({
    data: planData ? planData : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmitStripeCredentialsHandler: React.FormEventHandler<
    HTMLFormElement
  > = async (event) => {
    event.preventDefault();
    await updateCredentialsMutation({
      variables: { credentials: { stripePublicKey, stripeSecretKey } },
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
              "https://nebulr-group.github.io/nblocks-docs/docs/examples/first-branding"
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
          <div className="w-fit">
            <HeadingComponent type={"h2"} size="xl" className="font-bold mt-6">
              Plans
            </HeadingComponent>
            <table className="table-auto mt-6">
              <thead className="bg-gray-50 border-b-2">
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className={"pl-6 py-3"}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  );
                })}
              </thead>
              <tbody className="bg-white">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={
                              "border-b pt-4 pb-4 pl-0 pr-0 first:pl-4 first:border-r"
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* {data ? (
            <ul className="list-none mt-2">
              {data?.getAppConfig.businessModel?.plans.map((plan, i) => (
                <li
                  key={i}
                  className="py-3 px-4 border-b last:border-b-0 block"
                >
                  {plan.name} -{" "}
                  {plan.prices.map((price, j) => (
                    <i key={j}>
                      {price.currency} {price.amount} ({price.region}),{" "}
                    </i>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
              <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
            </>
          )} */}
        </div>
      </div>
      <div className="mt-6">
        <HeadingComponent type="h2" size="2xl" className="font-bold">
          Stripe Credentials
        </HeadingComponent>
        <div className="flex mt-5">
          <TextComponent className="font-semibold mr-2">Status</TextComponent>
          <ChipComponent
            type={userData?.getTenant.paymentsEnabled ? "success" : "tertiary"}
            icon={
              <span
                className={`rounded-full mr-1 w-1.5 h-1.5${
                  userData?.getTenant.paymentsEnabled
                    ? " bg-green-500"
                    : " bg-gray-500"
                }`}
              ></span>
            }
          >
            {userData?.getTenant.paymentsEnabled
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
