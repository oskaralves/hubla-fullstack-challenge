import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import { ADMIN_TRANSACTION_IMPORT_URL } from "@/navigation/urls";
import { SearchParams } from "@/types/common";
import { getLocale } from "@/utils/locale";
import { DocumentAttachmentIcon, ManagerIcon } from "hugeicons-react";
import Link from "next/link";
import { Suspense } from "react";
import { TransactionSellerBalanceTableSkeleton } from "./skeleton";
import { TransactionSellerBalanceList } from "./transaction-seller-balance-list";

type TransactionsPageProps = {
  searchParams?: SearchParams;
};

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const locale = await getLocale();

  const { IMPORT, TRANSACTIONS } = getDictionary(locale, "general");
  const { BALANCES } = getDictionary(locale, "navigation");

  return (
    <div className="space-y-4">
      <PageHeader icon={<ManagerIcon className="size-5" />} title={BALANCES}>
        <Link href={ADMIN_TRANSACTION_IMPORT_URL}>
          <Button
            className="w-10 px-2 md:w-auto md:px-4"
            startIcon={<DocumentAttachmentIcon className="size-5" />}
            labelClassName="hidden lg:flex"
          >
            {IMPORT} {TRANSACTIONS}
          </Button>
        </Link>
      </PageHeader>
      <Suspense fallback={<TransactionSellerBalanceTableSkeleton />}>
        <TransactionSellerBalanceList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
