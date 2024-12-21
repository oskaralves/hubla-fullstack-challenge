import { menuItemIconProps } from '@/constants';
import { useAppContext } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { useCycle } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MenuItem } from './MenuItem';
import { TitleHover } from './TitleHover';
import { MenuItemProps } from './types';

export const MenuItemCollapse = ({ item, className }: MenuItemProps) => {
  const pathname = usePathname();
  const { sidebarExpanded } = useAppContext();

  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <li className="group relative flex flex-col">
      <>
        <button
          onClick={() => toggleOpen()}
          className={`mx-1 flex flex-row items-center justify-between space-x-2 rounded-md p-3 transition-colors hover:bg-neutral-500/10
          ${isOpen ? 'rounded-b-none bg-neutral-500/10' : ''}
          ${
            pathname.includes(item.url as string)
              ? 'bg-purple-500/20 hover:bg-purple-500/20'
              : ''
          }`}
        >
          <div className="items-center justify-center transition-all">
            {item.icon}
          </div>
          <span
            className={`flex-1 overflow-hidden text-ellipsis text-nowrap text-left text-sm font-semibold text-neutral-900 dark:text-neutral-50`}
          >
            {item.title}
          </span>

          <div
            className={`flex transition-all
            ${isOpen ? 'rotate-180' : ''}
            ${!sidebarExpanded ? 'absolute left-[13px] top-8' : ''}`}
          >
            <ChevronDownIcon
              width={sidebarExpanded ? 16 : 12}
              height={sidebarExpanded ? 16 : 12}
              strokeWidth={menuItemIconProps.strokeWidth}
              className="stroke-neutral-400 transition-all dark:stroke-neutral-600"
            />
          </div>
          <TitleHover title={item.title} />
        </button>

        {isOpen && item?.children?.length && (
          <ul
            className={`mx-1 flex flex-col py-2
            ${sidebarExpanded ? 'p-1 py-2' : ''}
            ${isOpen ? 'rounded-b-md bg-neutral-500/10 ' : ''}`}
          >
            {item.children?.map((subItem, idx) => {
              return (
                <MenuItem
                  key={idx}
                  item={subItem}
                  className={cn(
                    'rounded-sm p-2',
                    sidebarExpanded ? className : 'mx-0 rounded-none'
                  )}
                />
              );
            })}
          </ul>
        )}
      </>
    </li>
  );
};
