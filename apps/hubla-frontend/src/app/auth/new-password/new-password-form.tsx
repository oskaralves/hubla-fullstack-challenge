"use client";

import * as z from "zod";

import { passwordForgotCheckCodeAction } from "@/actions/auth/password-forgot-check-code-action";
import { newPasswordAction } from "@/actions/auth/password-reset-action";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loading } from "@/components/ui/loading";
import { PasswordInput } from "@/components/ui/password-input";
import { useSonnerToast } from "@/components/ui/use-sonner-toast";
import { LOGIN_URL } from "@/navigation/urls";
import { CodeSchema, NewPasswordSchema } from "@/schemas/new-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
export const NewPasswordForm = () => {
  const router = useRouter();
  const { showToast } = useSonnerToast();

  const params = useSearchParams();
  const codeParam = params.get("code") || "";
  const codeOfSixDigits = useMemo(() => codeParam.slice(0, 6), [codeParam]);
  const [isCodeValidated, setIsCodeValidated] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [isPendingCode, startTransitionCode] = useTransition();
  const [isPendingReset, startTransitionReset] = useTransition();

  const formCheckCode = useForm<z.infer<typeof CodeSchema>>({
    resolver: zodResolver(CodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const formReset = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmitCode = useCallback(
    async (values: z.infer<typeof CodeSchema>) => {
      setError("");
      startTransitionCode(() => {
        passwordForgotCheckCodeAction(values).then((data) => {
          if (data.success) {
            setIsCodeValidated(true);
            showToast({
              type: "success",
              title: data?.success,
              description:
                "Preencha os campos e salve para redefinir sua senha.",
            });
            formReset.setValue("code", values.code);
          }
          setError(data.error || "");
        });
      });
    },
    [formReset, showToast]
  );

  const onSubmitReset = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    startTransitionReset(() => {
      newPasswordAction(values).then((data) => {
        if (data?.success) {
          router.push(LOGIN_URL);
          showToast({
            type: "success",
            title: data?.success,
            description: "Entre com seu e-mail e sua nova senha.",
          });
        }
        setError(data.error || "");
      });
    });
  };

  useEffect(() => {
    const codeValueForm = formCheckCode.getValues("code");
    if (!codeValueForm && !isCodeValidated && codeOfSixDigits?.length === 6) {
      formCheckCode.setValue("code", codeOfSixDigits);
      formCheckCode
        .handleSubmit(onSubmitCode)()
        .then(() => {
          formReset.setValue("code", codeOfSixDigits);
        });
    }
  }, [
    codeOfSixDigits,
    formCheckCode,
    formReset,
    isCodeValidated,
    onSubmitCode,
  ]);
  const inputOtpVariant = isCodeValidated
    ? "success"
    : error
      ? "destructive"
      : "default";
  return (
    <div className="w-full space-y-8">
      <Form {...formCheckCode}>
        <div className="flex">
          <div className="relative pr-12">
            <InputOTP
              variant={inputOtpVariant}
              disabled={isCodeValidated}
              maxLength={6}
              onChange={(code) => {
                if (code.length === 6) {
                  formCheckCode.setValue("code", code);
                  formCheckCode.handleSubmit(onSubmitCode)();
                }
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={0} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={1} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={3} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={4} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot variant={inputOtpVariant} index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="pointer-events-none absolute right-0 top-0">
              <Loading
                isLoading={isPendingCode}
                variant="outline"
                className="mr-2 mt-2 h-6 w-6 text-green-500"
              />
              {!isPendingCode && isCodeValidated ? (
                <CheckCircle2Icon className="mr-2 mt-2 h-6 w-6 text-green-500" />
              ) : null}
            </div>
          </div>
        </div>

        <FormField
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" placeholder="6 dígitos" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>{error}</AlertTitle>
            {/* <AlertDescription>{error}</AlertDescription> */}
          </Alert>
        )}
      </Form>
      {isCodeValidated && (
        <Form {...formReset}>
          <form
            className="w-full"
            onSubmit={formReset.handleSubmit(onSubmitReset)}
          >
            <div className="space-y-8">
              <FormField
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="hidden" disabled />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sua nova senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPendingReset}
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repita sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPendingReset}
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <TriangleAlertIcon />
                  <AlertTitle>{error}</AlertTitle>
                  {/* <AlertDescription>{error}</AlertDescription> */}
                </Alert>
              )}
              <Button
                type="submit"
                disabled={isPendingReset}
                isLoading={isPendingReset}
                size="lg"
                className="w-full"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
