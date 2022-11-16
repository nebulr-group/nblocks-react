import { useMutation, useQuery } from "@apollo/client";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  GetAppConfigDocument,
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

  const columnHelper = createColumnHelper<PlanGraphql>();

  const buildCloudLink = (row: Row<PlanGraphql>) => {
    const planName = row.getValue<string>("name");
    const regionName = row.getValue<PriceGraphql[]>("region")[0].region;
    return `https://account-api-stage.nebulr-core.com/app/${data?.getAppConfig.id}/checkoutView?plan=${planName}&region=${regionName}`;
  };

  const buildLocalLink = (row: Row<PlanGraphql>) => {
    const appUiURL = data?.getAppConfig.uiUrl;
    const signupRoute = RouteConfig.setup.signup;
    return `${appUiURL}${signupRoute}/${row.getValue("name")}`;
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Plan Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.group({
      header: "Prices",

      columns: [
        columnHelper.accessor("prices", {
          header: "Amount",
          id: "amount",
          cell: (info) => {
            console.log(info.cell.getValue());
            return info.cell.getValue<PriceGraphql[]>().map((price) => {
              return (
                <tr>
                  <td>{price.amount}</td>
                </tr>
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
                <tr>
                  <td>{price.currency}</td>
                </tr>
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
                <tr>
                  <td>{price.region}</td>
                </tr>
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
              <LinkComponent to={buildLocalLink(info.row)} type={"primary"}>
                {buildLocalLink(info.row)}
              </LinkComponent>
            );
          },
        }),
        columnHelper.display({
          header: "Nblocks Cloud Plan Sign Up",
          id: "nblocks-cloud-link",
          cell: (info) => {
            return (
              <LinkComponent
                to={buildCloudLink(info.row)}
                type={"primary"}
                nativeBehavior={true}
                target={"_blank"}
                className={"block text-center"}
              >
                Link
              </LinkComponent>
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
          {data ? (
            <TextComponent className="mt-2">
              {data.getAppConfig.id}
            </TextComponent>
          ) : (
            <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
          )}
        </div>
        <hr />
        <div>
          <HeadingComponent type={"h2"} size="xl">
            Name
          </HeadingComponent>
          {data ? (
            <TextComponent className="mt-2">
              {data?.getAppConfig.name}
            </TextComponent>
          ) : (
            <SkeletonLoader className="h-6 w-40 rounded-lg mt-2" />
          )}
        </div>
        <hr />
        <div className="bg-white w-80 border rounded-tr-md rounded-tl-md">
          <HeadingComponent
            type={"h2"}
            size="xl"
            className="bg-gray-50 p-4 border-b"
          >
            User roles
          </HeadingComponent>
          {data ? (
            <ul className="list-none inline-block mt-2 w-full">
              {data?.getAppConfig.roles?.map((role, index) => (
                <li
                  className="py-3 px-4 border-b last:border-b-0 block"
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
        <hr />
        <div className="bg-white">
          <div className="w-fit">
            <HeadingComponent
              type={"h2"}
              size="xl"
              className="bg-gray-50 p-4 border-t border-l border-r rounded-tr-md rounded-tl-md"
            >
              Plans
            </HeadingComponent>

            <table className="table-auto border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className={"border p-4"}
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
                          <td key={cell.id} className={"border-b p-4 pl-8"}>
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
                  if (event.target.value.length > 0) {
                    setStripeFormIsValid(true);
                  } else {
                    setStripeFormIsValid(false);
                  }

                  setStripePublicKey(event.target.value);
                }}
                value={stripePublicKey}
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
