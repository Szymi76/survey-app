import { createContext } from "react";
import User from "../types/User";
const AuthContext = createContext<AuthContextTypes | null>(null);

type AuthContextTypes = {
  user: User | null | undefined;
  loading: boolean;
  error: Error | null;
  createAccount: (displayName: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
  logOut: () => Promise<void>;
  updateProfileImage: (file: File) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  deleteUser: () => Promise<void>;
};

export default AuthContext;
