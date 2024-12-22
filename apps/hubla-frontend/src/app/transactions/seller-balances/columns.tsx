"use client";

import { DataTableColumnHeader } from "@/components/react-table/data-table-column-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useDictionary } from "@/contexts/dictionary-context";
import { TransactionSellerBalance } from "@/types/transaction";
import { currencyFormatter } from "@/utils/currency";

import { formatData } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { AppAvatar } from "../../../components/app/app-avatar";

export const useTransactionSellerBalanceListColumns = () => {
  const {
    field: { LAST_TRANSACTION_DATE, SELLER, BALANCE },
  } = useDictionary();

  const columns: ColumnDef<TransactionSellerBalance>[] = [
    {
      id: "image",
      size: 48,
      maxSize: 48,
      minSize: 48,
      enableResizing: false,
      meta: {
        loading: (
          <Skeleton className="size-12 max-h-12 min-h-12 min-w-12 max-w-12 rounded-lg bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      cell: ({ row }) => (
        <div className="relative size-12 max-h-12 max-w-12">
          <AppAvatar size={48} imageUrl={"/images/defaults/avatar.svg"} />
        </div>
      ),
    },
    {
      accessorKey: "seller",
      enableResizing: true,
      enableSorting: true,
      size: "75%" as unknown as number,
      maxSize: "75%" as unknown as number,
      minSize: "75%" as unknown as number,
      meta: {
        title: SELLER,
        loading: (
          <Skeleton className="h-6 w-32 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={SELLER} />
      ),
    },
    {
      accessorKey: "balance",
      enableResizing: true,
      size: 100,
      maxSize: 100,
      minSize: 100,
      meta: {
        title: BALANCE,
        loading: (
          <Skeleton className="h-6 w-24 rounded bg-slate-300/40 dark:bg-slate-300/20" />
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={BALANCE} />
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {currencyFormatter(row?.original?.balance)}
        </div>
      ),
    },
    {
      accessorKey: "lastTransactionDate",
      enableSorting: false,
      size: 100,
      maxSize: 100,
      minSize: 100,
      meta: {
        title: LAST_TRANSACTION_DATE,
        loading: (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded bg-slate-300/40 dark:bg-slate-300/20" />
            <Skeleton className="h-4 w-16 rounded bg-slate-300/40 dark:bg-slate-300/20" />
          </div>
        ),
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={LAST_TRANSACTION_DATE} />
      ),
      cell: ({ row }) => {
        {
          return formatData(row?.original?.lastTransactionDate, {
            formatIn: "YYYY/MM/DD HH:mm:ss",
            formatOut: "DD/MM/YYYY HH:mm:ss",
          });
        }
      },
    },
  ];
  return columns;
};
