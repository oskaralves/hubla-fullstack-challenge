"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useTransition } from "react";
import { Country } from "react-phone-number-input";

export type Locale = "pt-BR" | "en-US";
export const countries: Record<Locale, Country> = {
  "pt-BR": "BR",
  "en-US": "US",
};
type LanguageContextProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
  countries: Record<Locale, Country>;
};

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleSetLocale = async (newLocale: Locale) => {
    startTransition(async () => {
      await fetch("/api/set-locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: newLocale }),
      });

      setLocale(newLocale);

      router.refresh();
    });
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: handleSetLocale, countries, isPending }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
