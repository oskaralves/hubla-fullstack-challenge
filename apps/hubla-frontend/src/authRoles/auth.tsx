import { User } from "@/types/user";
import { Session } from "next-auth";

export const isAuthenticated = (user: User | null) => !!user;

export const hasRole = (currentUser: Session["user"], roles?: string[]) => {
  return (
    !roles ||
    roles.some((role) =>
      currentUser?.roles?.some((userRole) => userRole.role.includes(role))
    )
  );
};
