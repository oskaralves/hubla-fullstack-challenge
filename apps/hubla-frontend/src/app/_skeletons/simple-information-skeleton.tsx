import { Skeleton } from "@/components/ui/skeleton";
import { SimpleInformation } from "../_components/simple-information";

export type SimpleInformationSkeletonProps = {
  rowCount?: number;
  columnCount?: number;
};
export const SimpleInformationSkeleton = ({
  rowCount = 1,
  columnCount = 2,
}: SimpleInformationSkeletonProps) => {
  return (
    <>
      {Array(rowCount)
        .fill(null)
        .map((_, index) => (
          <SimpleInformation
            key={`item-skeleton-${index}`}
            isPending
            value={<Skeleton className="h-5 w-[50%] rounded" />}
          />
        ))}
      {!!columnCount ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {Array(columnCount)
            .fill(null)
            .map((_, index) => (
              <SimpleInformation
                key={`item-skeleton-${index}`}
                isPending
                value={<Skeleton className="h-5 w-[50%] rounded" />}
              />
            ))}
        </div>
      ) : null}
    </>
  );
};
