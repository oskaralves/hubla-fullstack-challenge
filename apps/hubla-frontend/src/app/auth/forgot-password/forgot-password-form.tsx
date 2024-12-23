"use client";

import { passwordForgotAction } from "@/actions/auth/password-forgot-action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSonnerToast } from "@/components/ui/use-sonner-toast";
import { NEW_PASSWORD_URL } from "@/navigation/urls";
import { PasswordForgotSchema } from "@/schemas/password-forgot-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { showToast } = useSonnerToast();

  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof PasswordForgotSchema>>({
    resolver: zodResolver(PasswordForgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof PasswordForgotSchema>) => {
    setError("");
    startTransition(() => {
      passwordForgotAction(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          router.push(NEW_PASSWORD_URL);
          showToast({
            type: "success",
            title: data?.success,
            description:
              "Preencha o código recebido em seu e-mail para redefinir sua senha.",
          });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Seu email aqui"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                {/* <AlertTitle>{error}</AlertTitle> */}
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            size="lg"
            className="w-full"
          >
            Recuperar minha senha
          </Button>
        </div>
      </form>
    </Form>
  );
};
