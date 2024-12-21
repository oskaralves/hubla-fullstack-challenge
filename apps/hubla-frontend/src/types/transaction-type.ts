import { ResponseException } from "./exception";

export type TransactionType = {
  id: number;
  description: string;
  nature: "INCOME" | "EXPENSE";
} & ResponseException;
