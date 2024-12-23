import { BadgeProps } from "@/components/ui/badge";
import { DictionaryType } from "@/dictionaries";

export const commonTransactionTypeNatureVariants: Record<
  keyof DictionaryType["enum"]["TRANSACTION_TYPE_NATURE_ENUM"],
  BadgeProps["variant"]
> = {
  INPUT: "outline",
  OUTPUT: "success",
};

export const commonStatusVariants: Record<
  keyof DictionaryType["enum"]["COMMON_STATUS_ENUM"],
  BadgeProps["variant"]
> = {
  DISABLED: "neutral",
  REMOVED: "destructive",
  ENABLED: "success",
};
