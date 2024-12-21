import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/dictionaries";
import { ADMIN_TRANSACTION_IMPORT_URL } from "@/navigation/urls";
import { SearchParams } from "@/types/common";
import { getLocale } from "@/utils/locale";
import { DocumentAttachmentIcon, TransactionIcon } from "hugeicons-react";
import Link from "next/link";
import { Suspense } from "react";
import { TransactionTableSkeleton } from "./skeleton";
import { TransactionList } from "./transaction-list";

type TransactionsPageProps = {
  searchParams?: SearchParams;
};

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const locale = await getLocale();

  const { TRANSACTIONS, IMPORT } = getDictionary(locale, "general");

  return (
    <div className="space-y-4">
      <PageHeader
        icon={<TransactionIcon className="size-5" />}
        title={TRANSACTIONS}
      >
        <Link href={ADMIN_TRANSACTION_IMPORT_URL}>
          <Button
            className="w-10 px-2 md:w-auto md:px-4"
            startIcon={<DocumentAttachmentIcon className="size-5" />}
            labelClassName="hidden lg:flex"
          >
            {IMPORT}
          </Button>
        </Link>
      </PageHeader>
      <Suspense fallback={<TransactionTableSkeleton />}>
        <TransactionList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
