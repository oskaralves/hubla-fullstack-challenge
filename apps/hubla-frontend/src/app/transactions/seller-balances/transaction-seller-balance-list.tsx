import { TriangleAlertIcon } from "lucide-react";

import { findAllAction } from "@/actions/find-all.action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { SearchParams } from "@/types/common";
import { TransactionSellerBalance } from "@/types/transaction";
import { TransactionSellerBalancesTable } from "./transaction-seller-balances-table";

type TransactionListProps = {
  searchParams?: SearchParams;
};
export const TransactionSellerBalanceList = async ({
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

  const sellerBalanceList = await findAllAction<TransactionSellerBalance>({
    endpoint: "/transactions/seller-balances",
    searchParam: search,
    pageParam: page,
    perPageParam: per_page,
    sortParam: sort,
    transactionTypesParams: transactionTypes,
    ...othersParams,
  });

  if ("error" in sellerBalanceList) {
    return (
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>{sellerBalanceList.error?.message}</AlertTitle>
      </Alert>
    );
  }

  return (
    <TransactionSellerBalancesTable sellerBalanceList={sellerBalanceList} />
  );
};
