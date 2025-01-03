import React, { FunctionComponent, ReactElement, useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  FilterFn    
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { NblocksButton } from "./NblocksButton";
import { ArrowLeftIcon, ArrowRightIcon, ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { SkeletonLoader } from "./SkeletonLoader";
import { SelectComponent } from "./SelectComponent";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils'
import { StateManager } from '../../utils/StateManager';


interface ReactTableProps<T extends object> {
  data: T[] | undefined;
  columns: ColumnDef<T>[];
  loading?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  emptyStateContent?: JSX.Element;
  enableGlobalFilter?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  tableId?: string;
  tableRef?: React.RefObject<{
    reset: () => void;
  }>;
}

// Cache for processed cell values
const searchCache = new Map<string, string>();

// Helper function to process cell value once
const getSearchableValue = (cellValue: any): string => {
  // Create a cache key based on value and type
  const cacheKey = `${cellValue}-${typeof cellValue}`;
  
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  let searchableValue: string;

  // Handle different data types
  if (cellValue instanceof Date || (typeof cellValue === 'string' && !isNaN(Date.parse(cellValue)))) {
    const date = new Date(cellValue);
    searchableValue = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).toLowerCase();
  } else if (typeof cellValue === 'boolean') {
    searchableValue = cellValue ? 'true' : 'false';
  } else if (typeof cellValue === 'number') {
    searchableValue = cellValue.toString();
  } else if (typeof cellValue === 'object') {
    searchableValue = JSON.stringify(cellValue).toLowerCase();
  } else {
    searchableValue = String(cellValue).toLowerCase();
  }

  // Store in cache
  searchCache.set(cacheKey, searchableValue);
  return searchableValue;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (!value) return true;

  // Pre-process search terms once
  const searchTerms = value.toLowerCase().split(' ').filter(Boolean);
  if (searchTerms.length === 0) return true;

  // Get searchable cells once
  const searchableCells = row.getAllCells().filter(cell => 
    cell.column.getCanFilter() && cell.getValue()
  );

  // Early return if no searchable cells
  if (searchableCells.length === 0) return false;

  // Use every-some pattern for better performance
  return searchTerms.every((term: string) => {
    const normalizedTerm = term.replace(/\s+/g, ' ').trim();
    
    return searchableCells.some(cell => {
      const searchableValue = getSearchableValue(cell.getValue());
      return searchableValue.includes(normalizedTerm);
    });
  });
};

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

// This empty array needs to be declared outside the component to prevent useReactTable from infinite re-renders
const emptyArray: any[] = [];

export const TableComponent = <T extends object>({
  data,
  columns,
  loading,
  defaultPageSize = 5,
  pageSizeOptions = [5, 10, 20, 30, 50, 100],
  emptyStateContent,
  enableGlobalFilter = false,
  globalFilter = '',
  onGlobalFilterChange,
  tableId,
  tableRef,
}: ReactTableProps<T>) => {
  // Replace the saved state logic
  const savedTableState = React.useMemo(() => {
    return tableId ? StateManager.getTableState(tableId) : null;
  }, [tableId]);

  // Initialize states from saved state
  const [sorting, setSorting] = useState<SortingState>(
    savedTableState?.sorting ?? []
  );
  const [pagination, setPagination] = useState(() => {
    const initialPagination = savedTableState?.pagination ?? {
      pageIndex: 0,
      pageSize: defaultPageSize,
    };  
    return initialPagination;
  });

  const table = useReactTable({
    data: data ?? emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      sorting,      
      pagination,
      globalFilter,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' 
        ? updater(sorting)
        : updater;
      
      setSorting(newSorting);

      // Save complete table state using StateManager      
      const completeState = {
        ...table.getState(),
        sorting: newSorting,
      };
      StateManager.saveTableState(completeState, tableId!);
    },    
    onPaginationChange: (updater) => {
      if (tableId) {
        const newPagination = typeof updater === 'function' 
          ? updater(pagination)
          : updater;
            
        setPagination(newPagination);

        // Save complete table state using StateManager        
        const completeState = {
          ...table.getState(),
          pagination: newPagination,
        };   
        StateManager.saveTableState(completeState, tableId);
      }
    },
    globalFilterFn: fuzzyFilter,
    debugTable: false,
    enableGlobalFilter: true,
    maxLeafRowFilterDepth: 2,
    initialState: {
      pagination: savedTableState?.pagination ?? {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
      sorting: savedTableState?.sorting ?? [],
      // globalFilter: savedTableState?.globalFilter ?? '',
    },
  });
  
  const [pageInputValue, setPageInputValue] = React.useState(
    (table.getState().pagination.pageIndex + 1).toString()
  );

  React.useEffect(() => {    
    setPageInputValue((table.getState().pagination.pageIndex + 1).toString()); 
  }, [table.getState().pagination.pageIndex]);

  // Implement reset function
  const reset = React.useCallback(() => {    
    setSorting([]);
    setPagination({
      pageIndex: 0,
      pageSize: defaultPageSize,
    });
       
  }, [defaultPageSize, tableId, table]);

  // Expose reset function through ref
  React.useImperativeHandle(
    tableRef,
    () => ({
      reset,
    }),
    [reset]
  );

  // Log when page input changes
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    console.log('[Pagination] Page input changed to:', value);
    if (!isNaN(value) && value >= 1 && value <= table.getPageCount()) {
      console.log('[Pagination] Setting page index to:', value - 1);
      table.setPageIndex(value - 1);
    }
  };

  /**
   * Uses template literals in classes to dynamically apply border radius to individual corner cells.
   * Required as a <table> element itself doesn't support border radius.
   */
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
                  px-0 pr-2 py-4 border-b border-gray-200 text-gray-500
                  ${hIndex === 0 ? "pl-4" : ""}
                  ${hIndex === headerGroup.headers.length - 1 ? "pr-4" : ""}
                  ${hgIndex === 0 && hIndex === 0 ? "rounded-tl-lg" : ""}
                  ${
                    hgIndex === 0 && hIndex === headerGroup.headers.length - 1
                      ? "rounded-tr-lg"
                      : ""
                  }
                  ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                  
                `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <div className="w-4 h-4">
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading && !data ? (
            <LoadingTable />
          ) : (
            <>
              {data && table.getRowModel().rows.length > 0 && (
                <tbody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row, rIndex) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, cIndex) => (
                        <td
                          key={cell.id}
                          style={{
                            width: `${
                              (cell.column.getSize() / table.getTotalSize()) *
                              100
                            }%`,
                          }}
                          className={`
                    py-4 px-0 pr-2 text-sm text-gray-900
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
              )}
            </>
          )}
        </table>
        <>
          {table.getRowModel().rows.length === 0 && emptyStateContent && (
            <>{emptyStateContent}</>
          )}
        </>
      </div>
      {table.getRowModel().rows.length !== 0 && (
        <div className="px-6 pb-4 pt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NblocksButton
              size="lg"
              type="tertiary"
              className="hidden md:flex items-center justify-center"
              onClick={() => {               
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftIcon className="h-6 w-6 inline-block mr-2" />
              {"Previous"}
            </NblocksButton>
            <NblocksButton
              type="tertiary"
              className="md:hidden items-center justify-center p-2"
              onClick={() => {               
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftIcon className="h-6 w-6 inline-block" />
            </NblocksButton>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <p>Page</p>
              <input
                type="number"
                min={1}
                max={table.getPageCount()}
                value={pageInputValue}
                onChange={(e) => {
                  setPageInputValue(e.target.value);
                }}
                onBlur={() => {
                  const pageNumber = parseInt(pageInputValue, 10);
                  if (
                    !isNaN(pageNumber) &&
                    pageNumber >= 1 &&
                    pageNumber <= table.getPageCount()
                  ) {
                    table.setPageIndex(pageNumber - 1);
                  } else {
                    setPageInputValue((table.getState().pagination.pageIndex + 1).toString());
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const pageNumber = parseInt(pageInputValue, 10);
                    if (
                      !isNaN(pageNumber) &&
                      pageNumber >= 1 &&
                      pageNumber <= table.getPageCount()
                    ) {
                      table.setPageIndex(pageNumber - 1);
                    } else {
                      setPageInputValue((table.getState().pagination.pageIndex + 1).toString());
                    }
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 1 && value <= table.getPageCount()) {
                    table.setPageIndex(value - 1);
                  }
                }}
                step={1}
                className="w-16 rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 sm:text-sm sm:leading-6"
              />
              <p>of {table.getPageCount()}</p>
            </span>

            <div className="w-32">
              <SelectComponent
                value={table.getState().pagination.pageSize.toString()}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                options={pageSizeOptions.map((pageSize) => ({
                  value: pageSize.toString(),
                  label: `${pageSize} rows`,
                }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NblocksButton
              type="tertiary"
              size={"lg"}
              className="hidden md:flex items-center justify-center"
              onClick={() => {             
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              {"Next"}
              <ArrowRightIcon className="h-6 w-6 inline-block md:ml-2" />
            </NblocksButton>
            <NblocksButton
              type="tertiary"
              className="md:hidden items-center justify-center p-2"
              onClick={() => {                
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightIcon className="h-6 w-6 inline-block" />
            </NblocksButton>
          </div>
        </div>
      )}
    </>
  );
};

const LoadingTable = () => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
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
    </tbody>
  );
};
