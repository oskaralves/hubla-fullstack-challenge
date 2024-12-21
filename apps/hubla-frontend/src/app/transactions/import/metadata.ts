import { APP_TITLE } from "@/constants";
import { getDictionary } from "@/dictionaries";
import { getLocale } from "@/utils/locale";
import { Metadata } from "next";

type GenerateMetadataProps = {
  params: {};
};
export const generateMetadata = async ({
  params: {},
}: GenerateMetadataProps): Promise<Metadata> => {
  const locale = await getLocale();
  const {
    TRANSACTIONS: { IMPORT_TRANSACTIONS },
  } = getDictionary(locale, "metadata");

  return {
    title: `${APP_TITLE} · ${IMPORT_TRANSACTIONS}`,
  };
};
