import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
import { SectionCard } from "../_components/section-card";

export type SectionCardSkeletonProps = {
  children: ReactNode;
};
export const SectionCardSkeleton = ({ children }: SectionCardSkeletonProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <SectionCard
        icon={<Skeleton className="size-5 rounded" />}
        title={<Skeleton className="h-5 w-32 rounded" />}
      >
        {children}
      </SectionCard>
    </div>
  );
};
