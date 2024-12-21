'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

type PageHeaderProps = {
  icon?: ReactNode | ReactNode[];
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode | ReactNode[];
  showGoBack?: boolean;
  isPending?: boolean;
};

const PageHeader = ({
  icon,
  title,
  subtitle,
  children,
  showGoBack,
  isPending = false,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center space-x-4">
      {showGoBack ? (
        <Button variant="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-5 w-5 stroke-primary" />
        </Button>
      ) : null}

      {isPending ? (
        <Skeleton className="flex h-10 min-w-10 rounded-md p-2" />
      ) : (
        <div className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border bg-background p-2">
          {icon}
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {isPending ? (
          <Skeleton className="mb-1 h-5 w-56 rounded" />
        ) : title && typeof title === 'string' ? (
          <h1 className="text-lg font-medium leading-tight">{title}</h1>
        ) : (
          title
        )}

        {isPending ? (
          <Skeleton className="h-4 w-32 rounded" />
        ) : subtitle && typeof subtitle === 'string' ? (
          <p className="text-sm leading-none text-foreground/50">{subtitle}</p>
        ) : (
          subtitle
        )}
      </div>

      <div className="flex flex-row space-x-4">
        {isPending && children ? (
          Array.isArray(children) ? (
            children.map((_, index) => (
              <Skeleton
                key={`child-skeleton-${index}`}
                className="h-10 w-24 rounded"
              />
            ))
          ) : (
            <Skeleton className="h-10 w-24 rounded" />
          )
        ) : (
          children
        )}
      </div>
    </div>
  );
};

const PageHeaderSkeleton = (props: PageHeaderProps) => {
  return <PageHeader {...props} isPending />;
};

export { PageHeader, PageHeaderSkeleton };
