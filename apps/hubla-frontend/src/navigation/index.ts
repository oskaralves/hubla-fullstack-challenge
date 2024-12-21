// import home from './home';
import { Locale } from '@/contexts/language-context';
import { admin } from './admin';
import { IMenuItem } from './types';

export const getNavigation = (locale: Locale): { items: IMenuItem[] } => {
  return {
    items: [admin(locale)],
  };
};
