import React, { FunctionComponent, useState, useEffect } from "react";
import {
  getPaginationRowModel,
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  RowData,
  ColumnDef,
  Column,
  Table,
  Row,
} from "@tanstack/react-table";
import { NblocksButton } from "./NblocksButton";
import { User } from "../../generated/graphql";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type ConfigObject = {};

const defaultData: User[] = [
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: true,
    fullName: "Oscar Soderlund",
    id: "1",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: true,
    fullName: "Oscar Soderlund",
    id: "2",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: true,
    fullName: "Oscar Soderlund",
    id: "3",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
  {
    createdAt: "2022-09-16T08:32:06.772+00:00",
    email: "oscar@nebulr.group",
    enabled: false,
    fullName: "Oscar Soderlund",
    id: "4",
    onboarded: true,
    role: "OWNER",
    username: "oscar@nebulr.group",
  },
];

const TableComponent: FunctionComponent<ConfigObject> = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("fullName", {
      header: "Name",
      footer: (props) => props.column.id,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("enabled", {
      header: "Status",
      footer: (props) => props.column.id,
      cell: (info) => (info.getValue() ? <i>Active</i> : <i>Deactivated</i>),
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
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });
  // Getter for header row/columns
  console.log(table.getHeaderGroups());
  console.log("__________________");
  console.log(table.getRowModel());
  return (
    <>
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
          {table.getRowModel().rows.map((row) => (
            <TableRowComponent row={row} />
          ))}
        </tbody>
      </table>
      <div className="border-t px-6 pb-4 pt-3.5 flex items-center justify-between">
        <NblocksButton
          size="lg"
          type="tertiary"
          className="flex items-center"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className="h-6 w-6 inline-block mr-2" />
          Previous
        </NblocksButton>
        <span className="flex items+center gap-1">
          <p>Page</p>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <NblocksButton
          size="lg"
          type="tertiary"
          className="flex items-center"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ArrowRightIcon className="h-6 w-6 inline-block ml-2" />
        </NblocksButton>
      </div>
    </>
  );
};

const TableRowComponent: FunctionComponent<{ row: Row<User> }> = ({ row }) => {
  //const { edit, setEdit } = useState(false);

  return (
    <tr key={row.id} className={"border-t border-b"}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export { TableComponent };
