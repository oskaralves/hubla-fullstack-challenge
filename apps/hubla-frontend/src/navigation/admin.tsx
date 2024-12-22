import { menuItemIconProps } from "@/constants";
import { Locale } from "@/contexts/language-context";
import { getDictionary } from "@/dictionaries";
import {
  DocumentAttachmentIcon,
  ManagerIcon,
  TransactionIcon,
} from "hugeicons-react";
import { IMenuItem } from "./types";
import {
  ADMIN_TRANSACTION_IMPORT_URL,
  ADMIN_TRANSACTION_LIST_URL,
  ADMIN_TRANSACTION_SELLER_BALANCES_URL,
} from "./urls";

export const admin = (locale: Locale): IMenuItem => {
  const { ADMINISTRATION, TRANSACTIONS, IMPORT_TRANSACTIONS, BALANCES } =
    getDictionary(locale, "navigation");
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
        id: "admin-transactions-import",
        title: IMPORT_TRANSACTIONS,
        type: "item",
        url: ADMIN_TRANSACTION_IMPORT_URL,
        icon: <DocumentAttachmentIcon {...menuItemIconProps} />,
      },
      {
        id: "admin-transactions-balance",
        title: BALANCES,
        type: "item",
        url: ADMIN_TRANSACTION_SELLER_BALANCES_URL,
        icon: <ManagerIcon {...menuItemIconProps} />,
      },
    ],
  };
};
