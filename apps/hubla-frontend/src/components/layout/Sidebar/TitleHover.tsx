import { useAppContext } from '@/contexts/AppContext';

type TitleHoverProps = { title: string };

export const TitleHover = ({ title }: TitleHoverProps) => {
  const { sidebarExpanded } = useAppContext();

  if (sidebarExpanded) return null;

  return (
    <div className="pointer-events-none invisible absolute left-full z-20 ml-6 hidden -translate-x-1 text-nowrap rounded-md bg-background px-3 py-2 text-sm font-medium text-neutral-800 opacity-0 shadow-sm transition-all group-hover:visible group-hover:translate-x-3 group-hover:opacity-100 md:flex">
      {title}
    </div>
  );
};
