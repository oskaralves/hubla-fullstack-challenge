import { AuthHeader } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-[360px] items-center">
      <div className="flex w-full flex-col items-center justify-center space-y-8">
        <AuthHeader title="Entre com sua conta" />
        <LoginForm />
        <Social />
        <div className="flex flex-col items-center">
          <p className="text-sm">Ainda não tem uma conta?</p>
          <Button variant="link" asChild className="font-bold">
            <Link href="/auth/register">Crie sua conta agora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
