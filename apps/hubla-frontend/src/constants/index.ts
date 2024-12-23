export const menuItemIconProps = {
  width: 22,
  height: 22,
  strokeWidth: 1.5,
};

// App
export const PREFIX_KEY =
  process.env.NODE_ENV === "development" ? "hubla.__dev__" : "hubla";

//  Keys of local storage or cookie
export const APP_TITLE = `${PREFIX_KEY !== "hubla" ? "[DEV] " : ""}Hubla - Full Stack Challenge`;
export const APP_LOCALE_KEY = `${PREFIX_KEY}.app-locale`;
export const APP_SIDEBAR_EXPANDED = `${PREFIX_KEY}.sidebar-expanded`;

// Pagination
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
export const DEFAULT_ITEMS_PER_PAGE = 10;
