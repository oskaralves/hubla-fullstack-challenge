import { useAppContext } from "@/contexts/AppContext";
import { MenuItem } from "./MenuItem";
import { MenuItemProps } from "./types";

export const MenuItemGroup = ({ item }: MenuItemProps) => {
  const { sidebarExpanded } = useAppContext();

  return (
    <li className="items-center px-2">
      <div className="flex min-h-10 flex-row items-center space-x-4 p-2 py-0">
        {sidebarExpanded ? (
          <span className="overflow-hidden text-ellipsis text-nowrap text-sm font-semibold text-neutral-400 dark:text-neutral-600">
            {item.title}
          </span>
        ) : (
          <div className="h-[2px] w-9 bg-neutral-300 dark:bg-neutral-700" />
        )}
      </div>

      <ul className="flex flex-col space-y-1">
        {item.children?.map((subItem, idx) => {
          return <MenuItem key={`menu-item-${idx}`} item={subItem} />;
        })}
      </ul>
    </li>
  );
};
