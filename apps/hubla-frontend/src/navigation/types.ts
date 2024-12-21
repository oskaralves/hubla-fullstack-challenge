import { ReactNode } from "react";

export interface IMenuItem {
  id: string;
  title: string;
  type: "collapse" | "group" | "item";
  external?: boolean;
  target?: "_self" | "_blank" | "_parent" | "_top";
  icon?: ReactNode;
  url?: string;
  children?: IMenuItem[];
}
