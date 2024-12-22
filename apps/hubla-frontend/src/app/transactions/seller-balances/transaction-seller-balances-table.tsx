"use client";

import {
  ListReactTable,
  ListReactTableFiltersProps,
} from "@/components/react-table";
import { PagedResponse } from "@/types/paged-response";
import { TransactionSellerBalance } from "@/types/transaction";
import { useTransactionSellerBalanceListColumns } from "./columns";

type TransactionSellerBalancesTableProps = {
  sellerBalanceList?: PagedResponse<TransactionSellerBalance>;
};
export const TransactionSellerBalancesTable = ({
  sellerBalanceList,
}: TransactionSellerBalancesTableProps) => {
  const filters: ListReactTableFiltersProps[] = [];
  const columns = useTransactionSellerBalanceListColumns();
  const filterableColumns = ["transactionTypes"];

  return (
    <ListReactTable
      data={sellerBalanceList}
      columns={columns}
      filterableColumns={filterableColumns}
      filters={filters}
    />
  );
};
