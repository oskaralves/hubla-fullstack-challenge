import { BadgeProps } from "@/components/ui/badge";
import { DictionaryType } from "@/dictionaries";

export const commonTransactionTypeNatureVariants: Record<
  keyof DictionaryType["enum"]["TRANSACTION_TYPE_NATURE_ENUM"],
  BadgeProps["variant"]
> = {
  INPUT: "outline",
  OUTPUT: "success",
};
