import { ResponseException } from "./exception";
import { TransactionType } from "./transaction-type";

export type Transaction = {
  id: string;
  type: number;
  date: string;
  product: string;
  value: number;
  seller: string;
  transactionType: TransactionType;
} & ResponseException;

export type TransactionsBulk = {
  error: boolean;
  successMessages: string[];
  errorMessages: string[];
};
