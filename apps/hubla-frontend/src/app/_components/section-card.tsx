import { Button, ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Fragment, ReactNode } from 'react';

export type ActionProps = {
  id: string;
  title?: string;
  render?: ReactNode;
  href?: string;
  target?: HTMLAnchorElement['target'];
  className?: string;
  variant?: ButtonProps['variant'];
  onClick?: () => void;
};

export type AppSectionCard = {
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  endAction?: ActionProps[];
  children?: ReactNode;
};

export const SectionCard = ({
  title,
  icon,
  className,
  endAction,
  children,
}: AppSectionCard) => {
  const renderActionButton = (action: ActionProps) => {
    const button = action?.href ? (
      <Link href={action.href} target={action?.target} className="inline-flex">
        <Button
          variant={action?.variant ?? 'outline-hover'}
          size={'sm'}
          className={cn(
            'h-8 min-w-8 rounded-sm',
            { 'p-0': action.title },
            action?.className
          )}
          onClick={action.onClick}
        >
          {action.render}
        </Button>
      </Link>
    ) : (
      <Button
        variant={action?.variant ?? 'outline-hover'}
        size={'sm'}
        className={cn(
          'h-8 min-w-8 rounded-sm',
          { 'p-0': action.title },
          action?.className
        )}
        onClick={action.onClick}
      >
        {action.render}
      </Button>
    );

    return action.title ? (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{action.title}</TooltipContent>
      </Tooltip>
    ) : (
      button
    );
  };

  return (
    <div className={cn('rounded-lg border bg-background', className)}>
      <div className="flex flex-col gap-4 p-4">
        {title || icon || endAction?.length ? (
          <div className="grid min-h-8 grid-cols-[1fr_auto] flex-row justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-row items-center gap-3">
              {icon ? <div className="min-w-6">{icon}</div> : null}
              {typeof title === 'string' ? (
                <h3 className="text-md">{title}</h3>
              ) : (
                title
              )}
            </div>
            {endAction?.length ? (
              <div className="flex flex-auto flex-row items-center gap-3">
                {endAction.map((action, index) => (
                  <Fragment key={`${action.id}-${index}`}>
                    {renderActionButton(action)}
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-4">{children}</div>
      </div>
    </div>
  );
};
