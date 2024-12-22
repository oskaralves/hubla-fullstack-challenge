"use client";

import { importTransactionsAction } from "@/actions/import-transactions.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSonnerToast } from "@/components/ui/use-sonner-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Txt02Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useDictionary } from "../../../contexts/dictionary-context";
import { useLanguage } from "../../../contexts/language-context";
import { cn } from "../../../lib/utils";
import {
  getImportTransactionsFormSchema,
  ImportTransactionFormValueType,
} from "../../../schemas/transaction.schema";
import { SectionCard } from "../../_components/section-card";

export const TransactionFileForm = () => {
  const { locale } = useLanguage();
  const router = useRouter();
  const { showToast, closeToast } = useSonnerToast();
  const [isPending, startTransition] = useTransition();

  const { general } = useDictionary();
  const {
    UPLOAD,
    UPLOAD_TRANSACTIONS_FILE,
    UPLOAD_FAILURE,
    UPLOAD_ERRORS,
    UPLOAD_ERRORS_DESCRIPTION,
    UPLOAD_SUCCESS,
    UPLOAD_SUCCESS_DESCRIPTION,
    TRANSACTION_FILE_PLACEHOLDER,
    TRANSACTION_FILE_FORMAT,
  } = general;

  const form = useForm<ImportTransactionFormValueType>({
    resolver: zodResolver(getImportTransactionsFormSchema(locale)),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = (values: ImportTransactionFormValueType) => {
    startTransition(async () => {
      const res = await importTransactionsAction(values.file);

      if (!res.success) {
        const idError = showToast({
          type: "error",
          title: UPLOAD_FAILURE,
          description: res?.error?.message,
          closeButton: true,
        });
        return closeToast(idError);
      }

      const { successMessages, errorMessages } = res.data || {};

      if (errorMessages?.length) {
        showToast({
          type: "error",
          title: UPLOAD_ERRORS,
          description: (
            <>
              {UPLOAD_ERRORS_DESCRIPTION.replace(
                "{count}",
                errorMessages.length.toString()
              )}
              <div className="mt-2 max-h-40 overflow-auto">
                {errorMessages.map((message, index) => (
                  <p key={`error-message-${index}`} className="text-red-500">
                    {message}
                  </p>
                ))}
              </div>
            </>
          ),
          closeButton: true,
        });
      }

      if (successMessages?.length) {
        showToast({
          type: "success",
          title: UPLOAD_SUCCESS,
          description: (
            <>
              {UPLOAD_SUCCESS_DESCRIPTION.replace(
                "{count}",
                successMessages.length.toString()
              )}
              <div className="mt-2 max-h-40 overflow-auto">
                {successMessages.map((message, index) => (
                  <p
                    key={`success-message-${index}`}
                    className="text-green-500"
                  >
                    {message}
                  </p>
                ))}
              </div>
            </>
          ),
          closeButton: true,
        });
      }

      form.reset({ file: null });
      router.refresh();
    });
  };

  return (
    <SectionCard>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field, fieldState: { invalid } }) => (
              <FormItem>
                <FormLabel className="sr-only">
                  {UPLOAD_TRANSACTIONS_FILE}
                </FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "relative flex flex-col items-center justify-center gap-4 rounded-md border border-dashed p-6 text-center",
                      {
                        "border-red-500": invalid,
                        "border-emerald-500 bg-emerald-50": field.value,
                        "border-gray-400 bg-gray-50": !field.value,
                      }
                    )}
                  >
                    <input
                      type="file"
                      accept=".txt"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      disabled={isPending}
                    />
                    <Txt02Icon
                      className={cn("size-10", {
                        "text-emerald-500": field.value,
                        "text-primary": !field.value,
                      })}
                    />
                    <p className="text-sm font-medium text-gray-600">
                      {field.value?.name || TRANSACTION_FILE_PLACEHOLDER}
                    </p>
                    <p className="text-xs text-gray-500">
                      {TRANSACTION_FILE_FORMAT}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              className="w-full md:w-auto md:min-w-24"
            >
              {UPLOAD}
            </Button>
          </div>
        </form>
      </Form>
    </SectionCard>
  );
};
