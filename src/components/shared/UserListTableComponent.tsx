import React, { FunctionComponent, useState, useEffect } from "react";
import {
  getPaginationRowModel,
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { NblocksButton } from "./NblocksButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { ListUsersDocument, User } from "../../gql/graphql";
import { useQuery } from "@apollo/client";
import { UserTableRowComponent } from "./UserTableRowComponent";
import { ModalComponent } from "./ModalComponent";
import { SafeUserNameComponent } from "./SafeUserNameComponent";
import { SkeletonLoader } from "./SkeletonLoader";

/**
 *
 */
type ConfigObject = {};

export type ModalState = {
  heading: string;
  icon?: React.ReactNode;
  description: string;
  type: "primary" | "danger" | "warning" | "success" | "info";
  onPrimaryClick: () => void;
};

const UserListTableComponent: FunctionComponent<ConfigObject> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [modalState, setModalState] = useState<ModalState>({
    heading: "",
    description: "",
    type: "primary",
    onPrimaryClick: () => {},
  });

  const { data, loading } = useQuery(ListUsersDocument);

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("fullName", {
      header: "Name",
      footer: (props) => props.column.id,
      cell: (info) => (
        <span className="font-medium text-gray-900">
          <SafeUserNameComponent name={info.getValue()!} />
        </span>
      ),
    }),
    columnHelper.accessor("enabled", {
      header: "Status",
      footer: (props) => props.column.id,
      cell: (info) => (info.getValue() ? "Active" : "Deactivated"),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email Address",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
      meta: { editable: true },
    }),
    columnHelper.display({
      id: "edit",
    }),
  ];

  const getModalButtons = (type: string) => {
    switch (type) {
      case "danger":
        return (
          <div className="flex flex-col-reverse md:flex-row md:justify-between mt-5 gap-3">
            <NblocksButton
              size="md"
              className="w-full"
              type="tertiary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </NblocksButton>
            <NblocksButton
              size="md"
              className="w-full"
              type="danger"
              onClick={() => {
                modalState.onPrimaryClick();
              }}
            >
              Delete
            </NblocksButton>
          </div>
        );
      default:
        return (
          <div className="flex flex-col-reverse md:flex-row md:justify-between mt-5 gap-3">
            <NblocksButton
              size="md"
              className="w-full"
              type="tertiary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </NblocksButton>
            <NblocksButton
              size="md"
              className="w-full"
              type="primary"
              onClick={() => {
                modalState.onPrimaryClick();
                setIsOpen(false);
              }}
            >
              Save changes
            </NblocksButton>
          </div>
        );
    }
  };

  const table = useReactTable({
    data: data?.listUsers ? data.listUsers : [],
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <>
      <div className="w-full h-full overflow-x-auto">
        <table className="w-full text-left">
          <thead className="h-11 bg-gray-50 border-t border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && loading && (
              <>
                <tr>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                </tr>
                <tr>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                </tr>
                <tr>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                  <td className={"relative"}>
                    <SkeletonLoader className="h-8 w-full rounded-md" />
                  </td>
                </tr>
              </>
            )}
            {table.getRowModel().rows.map((row, index) => (
              <UserTableRowComponent
                row={row}
                key={index}
                setModalState={setModalState}
                setModalIsOpen={setIsOpen}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t px-6 pb-4 pt-3.5 flex items-center justify-between">
        <NblocksButton
          size="lg"
          type="tertiary"
          className="hidden md:flex items-center justify-center"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className="h-6 w-6 inline-block mr-2" />
          Previous
        </NblocksButton>
        <NblocksButton
          type="tertiary"
          className="md:hidden items-center justify-center p-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className="h-6 w-6 inline-block" />
        </NblocksButton>
        <span className="flex items+center gap-1">
          <p>Page</p>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <NblocksButton
          type="tertiary"
          size={"lg"}
          className="hidden md:flex items-center justify-center"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ArrowRightIcon className="h-6 w-6 inline-block md:ml-2" />
        </NblocksButton>
        <NblocksButton
          type="tertiary"
          className="md:hidden items-center justify-center p-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightIcon className="h-6 w-6 inline-block" />
        </NblocksButton>
      </div>
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icon={modalState.icon}
        iconType={modalState.type}
        heading={modalState.heading}
        description={modalState.description}
      >
        {getModalButtons(modalState.type)}
      </ModalComponent>
    </>
  );
};

export { UserListTableComponent };
