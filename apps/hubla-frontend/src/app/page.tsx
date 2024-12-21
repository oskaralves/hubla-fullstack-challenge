import { ADMIN_TRANSACTION_LIST_URL } from "@/navigation/urls";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect(ADMIN_TRANSACTION_LIST_URL);
}
