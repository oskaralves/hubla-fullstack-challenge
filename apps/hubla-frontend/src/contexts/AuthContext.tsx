"use client";

import { authRoles } from "@/authRoles";
import { Session } from "next-auth";
import { createContext, ReactNode, useContext } from "react";

interface AuthContextProps {
  hasSession: boolean;
  currentSession: Session | null;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
  hasSession: false,
  currentSession: null,
  isAdmin: () => false,
});

type AuthContextProviderProps = {
  children: ReactNode;
  session: Session | null; // Recebe a sessão como prop
};

const AuthContextProvider = ({
  children,
  session,
}: AuthContextProviderProps) => {
  const currentSession = session || null;
  const hasSession = Boolean(session);

  const isAdmin = () =>
    Boolean(
      currentSession &&
        currentSession?.user?.roles?.some(
          (userRole) => authRoles.ADMIN[0] === userRole.role
        )
    );

  return (
    <AuthContext.Provider
      value={{
        hasSession,
        currentSession,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };
