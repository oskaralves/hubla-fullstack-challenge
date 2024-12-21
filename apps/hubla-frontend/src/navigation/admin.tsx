import { menuItemIconProps } from "@/constants";
import { Locale } from "@/contexts/language-context";
import { getDictionary } from "@/dictionaries";
import { DocumentAttachmentIcon, TransactionIcon } from "hugeicons-react";
import { IMenuItem } from "./types";
import {
  ADMIN_TRANSACTION_IMPORT_URL,
  ADMIN_TRANSACTION_LIST_URL,
} from "./urls";

export const admin = (locale: Locale): IMenuItem => {
  const { ADMINISTRATION, TRANSACTIONS, IMPORT_TRANSACTIONS } = getDictionary(
    locale,
    "navigation"
  );
  return {
    id: "admin-group",
    title: ADMINISTRATION,
    type: "group",
    children: [
      {
        id: "admin-list-transactions",
        title: TRANSACTIONS,
        type: "item",
        url: ADMIN_TRANSACTION_LIST_URL,
        icon: <TransactionIcon {...menuItemIconProps} />,
      },
      {
        id: "admin-import-transactions",
        title: IMPORT_TRANSACTIONS,
        type: "item",
        url: ADMIN_TRANSACTION_IMPORT_URL,
        icon: <DocumentAttachmentIcon {...menuItemIconProps} />,
      },
    ],
  };
};
