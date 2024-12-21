"use client";

import {
  ListReactTable,
  ListReactTableFiltersProps,
} from "@/components/react-table";
import { useDictionary } from "@/contexts/dictionary-context";
import { PagedResponse } from "@/types/paged-response";
import { Transaction } from "@/types/transaction";
import { TransactionType } from "@/types/transaction-type";
import { useTransactionListColumns } from "./columns";

type TransactionsTableProps = {
  userList?: PagedResponse<Transaction>;
  transactionTypeList?: PagedResponse<TransactionType>;
};
export const TransactionsTable = ({
  userList,
  transactionTypeList,
}: TransactionsTableProps) => {
  const {
    general: { TYPES },
  } = useDictionary();

  const filters: ListReactTableFiltersProps[] = [
    {
      id: "transactionTypes",
      title: TYPES,
      options:
        transactionTypeList?.rows?.map((item) => ({
          value: String(item.id),
          label: item.description,
        })) || [],
    },
  ];
  const columns = useTransactionListColumns();
  const filterableColumns = ["transactionTypes"];

  return (
    <ListReactTable
      data={userList}
      columns={columns}
      filterableColumns={filterableColumns}
      filters={filters}
    />
  );
};
