import { TriangleAlertIcon } from "lucide-react";

import { findAllAction } from "@/actions/find-all.action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { SearchParams } from "@/types/common";
import { Transaction } from "@/types/transaction";
import { TransactionType } from "@/types/transaction-type";
import { TransactionsTable } from "./transactions-table";

type TransactionListProps = {
  searchParams?: SearchParams;
};
export const TransactionList = async ({
  searchParams,
}: TransactionListProps) => {
  const {
    page = "1",
    per_page = DEFAULT_ITEMS_PER_PAGE.toString(),
    sort,
    search,
    transactionTypes,
    ...othersParams
  } = searchParams || {};

  const userList = await findAllAction<Transaction>({
    endpoint: "/transactions",
    searchParam: search,
    pageParam: page,
    perPageParam: per_page,
    sortParam: sort,
    transactionTypesParams: transactionTypes,
    ...othersParams,
  });

  const transactionTypeList = await findAllAction<TransactionType>({
    endpoint: "/transaction-types",
    perPageParam: "1000",
    options: { cache: "force-cache" },
  });

  if ("error" in { ...userList, ...transactionTypeList }) {
    return (
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>
          {userList.error?.message || transactionTypeList.error?.message}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <TransactionsTable
      userList={userList}
      transactionTypeList={transactionTypeList}
    />
  );
};
