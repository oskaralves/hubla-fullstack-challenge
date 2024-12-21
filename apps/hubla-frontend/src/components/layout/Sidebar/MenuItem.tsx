import { IMenuItem } from '@/navigation/types';
import { MenuItemCollapse } from './MenuItemCollapse';
import { MenuItemGroup } from './MenuItemGroup';
import { MenuItemSimple } from './MenuItemSimple';
type MenuItemProps = { item: IMenuItem; className?: string };

export const MenuItem = ({ item, className }: MenuItemProps) => {
  const renderByType = (item: IMenuItem) => {
    const menuTypes: Record<IMenuItem['type'], any> = {
      group: <MenuItemGroup {...{ item, className }} />,
      collapse: <MenuItemCollapse {...{ item, className }} />,
      item: <MenuItemSimple {...{ item, className }} />,
    };
    return menuTypes[item.type] || menuTypes.item;
  };

  return renderByType(item);
};
