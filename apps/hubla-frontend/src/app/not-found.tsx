"use client";

import { Button } from "@/components/ui/button";
import { BASE_ROUTE } from "@/navigation/urls";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-auto min-h-svh w-full items-center justify-center overflow-auto bg-[#314000] bg-primary">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-7xl font-extralight text-white">404</h1>
        <p className="text-md text-white/70">
          Esta página não pôde ser encontrada
        </p>
        <Link href={BASE_ROUTE}>
          <Button>Voltar para início</Button>
        </Link>
      </div>
    </div>
  );
}
