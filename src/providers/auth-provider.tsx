import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/lib/local-storage";
import { getProfile } from "@/features/auth/api/use-get-profile";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<User | null>(() => {
    return getStorageItem<User>("user");
  });

  const [token, setTokenState] = useState<string | null>(() => {
    return getStorageItem<string>("token");
  });

  const setUser = useCallback((userData: User | null) => {
    setUserState(userData);
    if (userData) {
      setStorageItem("user", userData);
    } else {
      removeStorageItem("user");
    }
  }, []);

  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      setStorageItem("token", newToken);
    } else {
      removeStorageItem("token");
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
