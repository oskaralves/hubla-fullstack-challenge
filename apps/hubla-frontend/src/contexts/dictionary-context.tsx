"use client";

import { DictionaryType } from "@/dictionaries";
import { createContext, useContext } from "react";

type DictionaryContextType = DictionaryType | undefined;

const DictionaryContext = createContext<DictionaryContextType>(undefined);

export const DictionaryProvider = ({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: DictionaryType;
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
};
