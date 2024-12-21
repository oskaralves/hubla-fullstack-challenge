'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROWS_PER_PAGE_OPTIONS } from '@/constants';
import { useDictionary } from '@/contexts/dictionary-context';
import { translateFormatter } from '@/dictionaries/utils';
import { Table } from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  totalRows?: number;
};

export function DataTablePagination<TData>({
  table,
  totalRows,
}: DataTablePaginationProps<TData>) {
  const {
    general: {
      ITEMS_PER_PAGE,
      TOTAL_ROWS,
      PAGE_OF_TOTAL,
      GO_TO_FIRST_PAGE,
      GO_TO_PREVIOUS_PAGE,
      GO_TO_NEXT_PAGE,
      GO_TO_LAST_PAGE,
    },
  } = useDictionary();

  return (
    <div className="flex items-center justify-between">
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {ROWS_PER_PAGE_OPTIONS.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium text-neutral-500">
            {ITEMS_PER_PAGE}
          </p>
        </div>
      </div>
      <div>
        {totalRows ? (
          <p className="hidden text-sm font-medium text-neutral-500 md:inline-block">
            {translateFormatter(TOTAL_ROWS, { rows: totalRows })}
          </p>
        ) : null}
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center text-sm font-medium text-neutral-500">
          {translateFormatter(PAGE_OF_TOTAL, {
            page: table.getState().pagination.pageIndex + 1,
            total: table.getPageCount(),
          })}
        </div>
        <Button
          variant="outline-hover"
          className="hidden h-8 w-8 p-0 lg:flex"
          title={GO_TO_FIRST_PAGE}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{GO_TO_FIRST_PAGE}</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline-hover"
          className="h-8 w-8 p-0"
          title={GO_TO_PREVIOUS_PAGE}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">{GO_TO_PREVIOUS_PAGE}</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline-hover"
          className="h-8 w-8 p-0"
          title={GO_TO_NEXT_PAGE}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{GO_TO_NEXT_PAGE}</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline-hover"
          className="hidden h-8 w-8 p-0 lg:flex"
          title={GO_TO_LAST_PAGE}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">{GO_TO_LAST_PAGE}</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
