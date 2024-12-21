"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { APP_SIDEBAR_EXPANDED } from "@/constants";
import { setCookie } from "cookies-next";
type AppContextProps = {
  sidebarExpanded: boolean;
  handleToggleSidebar: () => void;
};

const initialContext: AppContextProps = {
  sidebarExpanded: true,
  handleToggleSidebar: () => undefined,
};

const AppContext = createContext<AppContextProps>(initialContext);

const AppContextProvider = ({
  defaultSidebarExpanded: defaultSidebarExpanded,
  children,
}: {
  defaultSidebarExpanded: boolean;
  children: ReactNode | ReactNode[];
}) => {
  const [sidebarExpanded, setSidebarExpanded] = useState<
    AppContextProps["sidebarExpanded"]
  >(defaultSidebarExpanded);

  const handleToggleSidebar = useCallback(() => {
    setSidebarExpanded((prevState) => !prevState);
  }, [setSidebarExpanded]);

  useEffect(() => {
    setCookie(APP_SIDEBAR_EXPANDED, sidebarExpanded);
  }, [sidebarExpanded, defaultSidebarExpanded]);

  return (
    <AppContext.Provider
      value={{
        sidebarExpanded,
        handleToggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };
