import React, { ReactElement } from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { NblocksButton } from "./NblocksButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { SkeletonLoader } from "./SkeletonLoader";

interface ReactTableProps<T extends object> {
  data: T[] | undefined;
  columns: ColumnDef<T>[];
  loading?: boolean;
  defaultPageSize?: number;
}

/**
 * Configurable Table component based on TanStack React Table.
 *
 * @example
 * Define your columns using the ColumnDef type from Tanstack and your data type. TanStack supports custom components:
 * ```
 *const columns: ColumnDef<YourDataType>[] = [
 *  {
 *    header: 'Name',
 *    cell: (row) => (
 *      <CustomComponent keyLabel={row.renderValue() as string} />
 *    ),
 *    accessorKey: 'key',
 *    size: 200,
 *  },
 *  {
 *    header: 'Description',
 *    cell: (row) => row.renderValue(),
 *    accessorKey: 'description',
 *    size: 600,
 *  },
 *  {
 *    id: 'edit',
 *    header: '',
 *    accessorFn: (row) => row,
 *    cell: ({ cell }) => {
 *      const row = cell.renderValue();
 *      return <EditComponent row={row as PrivilegeGraphql} />;
 *    },
 *    size: 200,
 *  },
 *];
 * ```
 * The `size` property defines the relative size for the column
 *
 * @param loading - If the data is fetching
 * @param defaultPageSize - Initial number of pagination rows
 * @returns The a table.
 */

export const TableComponent = <T extends object>({
  data,
  columns,
  loading,
  defaultPageSize = 5,
}: ReactTableProps<T>) => {
  // The useReactTable hook crashes unless data is available, therefore the entire component is wrapped
  if (data && !loading) {
    const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: true,
      initialState: {
        pagination: {
          pageSize: defaultPageSize,
        },
      },
    });

    return (
      <>
        <div className="w-full h-full overflow-x-visible grow rounded-lg border border-gray-200 bg-white shadow">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
              {table.getHeaderGroups().map((headerGroup, hgIndex) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, hIndex) => (
                    <th
                      key={header.id}
                      style={{
                        width: `${
                          (header.column.getSize() / table.getTotalSize()) * 100
                        }%`,
                      }}
                      className={`
                  px-0 py-4 border-b border-gray-200 text-gray-500
                  ${hIndex === 0 ? "pl-4" : ""}
                  ${hIndex === headerGroup.headers.length - 1 ? "pr-4" : ""}
                  ${hgIndex === 0 && hIndex === 0 ? "rounded-tl-lg" : ""}
                  ${
                    hgIndex === 0 && hIndex === headerGroup.headers.length - 1
                      ? "rounded-tr-lg"
                      : ""
                  }
                  
                `}
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
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, rIndex) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, cIndex) => (
                    <td
                      key={cell.id}
                      style={{
                        width: `${
                          (cell.column.getSize() / table.getTotalSize()) * 100
                        }%`,
                      }}
                      className={`
                  py-4 px-0 text-sm text-gray-900
                  ${cIndex === 0 ? "pl-4" : ""}
                  ${cIndex === row.getVisibleCells().length - 1 ? "pr-4" : ""}
                  ${
                    rIndex === table.getRowModel().rows.length - 1 &&
                    cIndex === 0
                      ? "rounded-bl-lg"
                      : ""
                  }
                  ${
                    rIndex === table.getRowModel().rows.length - 1 &&
                    cIndex === row.getVisibleCells().length - 1
                      ? "rounded-br-lg"
                      : ""
                  }
                `}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 pb-4 pt-3.5 flex items-center justify-between">
          <NblocksButton
            size="lg"
            type="tertiary"
            className="hidden md:flex items-center justify-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeftIcon className="h-6 w-6 inline-block mr-2" />
            {"Previous"}
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
            {"Next"}
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
      </>
    );
  } else {
    return <LoadingTable />;
  }
};

const LoadingTable = (): ReactElement => {
  return (
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
  );
};
