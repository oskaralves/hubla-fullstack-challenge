import { ResponseException } from "./exception";

export type TransactionType = {
  id: number;
  description: string;
  nature: "INPUT" | "OUTPUT";
} & ResponseException;
