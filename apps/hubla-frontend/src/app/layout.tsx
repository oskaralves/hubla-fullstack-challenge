import { auth } from "@/auth";
import { Header } from "@/components/layout/Header";

import { Sidebar } from "@/components/layout/Sidebar";
import { UserSession } from "@/components/layout/Sidebar/UserSession";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_TITLE } from "@/constants";
import { AppContextProvider } from "@/contexts/AppContext";
import { DictionaryProvider } from "@/contexts/dictionary-context";
import { LanguageProvider, Locale } from "@/contexts/language-context";
import { getDictionary } from "@/dictionaries";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { getLocale } from "@/utils/locale";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { getSidebarExtendedAction } from "../actions/sidebar-extended.action";
import { AuthContextProvider } from "../contexts/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const dictionary = getDictionary<any>(locale);

  const session = await auth();

  const defaultSidebarExpanded = await getSidebarExtendedAction();
  return (
    <html lang={locale} suppressHydrationWarning className="overflow-hidden">
      <body
        className={cn(
          inter.className,
          "min-h-screen text-pretty antialiased transition-all"
        )}
      >
        <LanguageProvider initialLocale={locale as Locale}>
          <DictionaryProvider dictionary={dictionary}>
            <ThemeProvider>
              <TooltipProvider>
                {!!session?.user?.id ? (
                  <main className="font-default grid h-screen grid-cols-1 grid-rows-[auto_1fr] overflow-hidden text-foreground md:grid-cols-[auto_1fr]">
                    <AppContextProvider
                      defaultSidebarExpanded={defaultSidebarExpanded}
                    >
                      <AuthContextProvider session={session}>
                        <Header user={session.user} />
                        <Sidebar user={session.user}>
                          <UserSession id="sidebar" user={session.user} />
                        </Sidebar>

                        <div className="max-h-[calc(100vh-68px)] overflow-auto rounded-tl-3xl border-l border-t border-border bg-neutral-100 text-foreground dark:bg-neutral-900">
                          <div className="min-h-full p-6">{children}</div>
                        </div>
                      </AuthContextProvider>
                    </AppContextProvider>
                  </main>
                ) : (
                  children
                )}
              </TooltipProvider>
              <Toaster richColors closeButton visibleToasts={6} />
            </ThemeProvider>
          </DictionaryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
