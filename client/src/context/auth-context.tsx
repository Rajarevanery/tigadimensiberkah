import { createContext, useContext } from "react";
import type { Role } from "../types/types";

type AuthContextType = {
  id: string;
  email: string;
  nama: string;
  role: Role | null;
  isAuthenticated: boolean;
  isPending: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuthContext harus digunain didalem authprovider");
  }
  return context;
};
