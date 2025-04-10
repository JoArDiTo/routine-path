import { setTokenToCookie, getTokenFromCookie, removeTokenFromCookie } from "@lib/service";
import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface UserDataByToken {
  id: string;
  name: string;
}

interface AuthContextProps {
  user: UserDataByToken | null;
  auth: (token: string) => void;
  exit: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataByToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = getTokenFromCookie();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          exit();
          toast.error('Sesión expirada, iniciar sesión nuevamente.');
        } else {
          setUser({ id: payload.id, name: payload.name });
        }
      } catch (error) {
        exit();
        toast.error('Token inválido, iniciar sesión nuevamente.');
      }
    } else {
      if (user) {
        reset();
        toast.error('No está autenticado, iniciar sesión nuevamente');
      }
    }
    setIsLoading(false);
  }, [location]);

  const auth = (token: string) => {
    setTokenToCookie(token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    setUser({ id: payload.id, name: payload.name });
    setLocation("/");
    toast.success("Inicio de sesión exitoso.");
  }

  const exit = () => {
    removeTokenFromCookie()
    reset()
  }

  const reset = () => {
    setUser(null);
    setLocation("/");
  }

  return (
    <AuthContext.Provider value={{ user, auth, exit, isLoading }}>
      { children }
    </AuthContext.Provider>
  )
}
