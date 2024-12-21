import { Locale } from "@/contexts/language-context";
import { getDictionary } from "@/dictionaries";
import { z } from "zod";

export const getImportTransactionsFormSchema = (locale: Locale = "pt-BR") => {
  const { FILE_REQUIRED, ONLY_TXT_ALLOWED } = getDictionary(
    locale,
    "validation"
  );

  return z.object({
    file: z
      .any()
      .refine((file) => typeof window !== "undefined" && file instanceof File, {
        message: FILE_REQUIRED,
      })
      .refine((file) => file?.type === "text/plain", {
        message: ONLY_TXT_ALLOWED,
      }),
  });
};

export const ImportTransactionsSchema =
  getImportTransactionsFormSchema("pt-BR");

export type ImportTransactionFormValueType = z.infer<
  typeof ImportTransactionsSchema
>;
