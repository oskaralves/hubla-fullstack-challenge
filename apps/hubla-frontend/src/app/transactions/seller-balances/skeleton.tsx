"use client";

import { DataTableSkeleton } from "@/components/react-table/data-table-skeleton";
import { useTransactionSellerBalanceListColumns } from "./columns";

export const TransactionSellerBalanceTableSkeleton = () => {
  const columns = useTransactionSellerBalanceListColumns();

  return <DataTableSkeleton columns={columns} totalRows={10} />;
};
