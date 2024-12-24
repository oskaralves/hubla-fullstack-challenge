import { Session } from "next-auth";
import { ResponseResult } from "../types/common";
import { TransactionsBulk } from "../types/transaction";

export async function importTransactionsAction(
  file: File,
  session: Session | null
): Promise<ResponseResult<TransactionsBulk>> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const headers: HeadersInit = {
      "Access-Control-Allow-Origin": "*",
    };
    const accessToken = session?.user?.accessToken;
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/bulk`,
      {
        method: "POST",
        body: formData,
        headers,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: { message: error.message || "Erro desconhecido ao importar." },
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message || "Erro ao conectar ao servidor." },
    };
  }
}
