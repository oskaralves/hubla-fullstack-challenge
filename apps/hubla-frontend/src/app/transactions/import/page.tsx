import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/utils/locale";
import { DocumentAttachmentIcon } from "hugeicons-react";
import { PageHeader } from "../../../components/app/page-header";
import { TransactionFileForm } from "./file-form";
import { generateMetadata } from "./metadata";

const TransactionImportPage = async () => {
  const locale = await getLocale();
  const { IMPORT, TRANSACTIONS } = getDictionary(locale, "general");

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<DocumentAttachmentIcon className="size-5" />}
        showGoBack
        title={`${IMPORT} ${TRANSACTIONS}`}
      />
      <TransactionFileForm />
    </div>
  );
};
export { generateMetadata };
export default TransactionImportPage;
