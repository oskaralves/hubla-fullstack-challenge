"use client";

import { Button } from "@/components/ui/button";
import { BASE_ROUTE } from "@/navigation/urls";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="element-waves--background flex h-auto min-h-[100%] w-full items-center justify-center overflow-auto bg-primary">
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
        <h1 className="text-7xl font-extralight text-white">404</h1>
        <p className="text-md text-white/70">This page could not be found.</p>
        <Button
          variant="outline"
          className="border-white text-white"
          onClick={() => undefined}
          asChild
        >
          <Link href={BASE_ROUTE}>Ir para dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
