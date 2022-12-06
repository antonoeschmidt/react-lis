import { createContext, useState } from "react";

export type AuthContextType = {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>(null);

export const useAuthContext = (): AuthContextType => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${(window as any)._env_.REACT_APP_BACKEND}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const checkAuth = async (): Promise<boolean> => {
    setLoading(true);
    let auth = !!localStorage.getItem("token");
    if (auth) {
      const response = await fetch(
        `${(window as any)._env_.REACT_APP_BACKEND}/api/measurements/results`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error("Error fetching data");
      return true;
    } else {
      return false;
    }
  };

  return {
    login,
    logout,
    checkAuth,
    loading,
    setLoading,
    loggedIn,
    setLoggedIn,
  };
};

export default AuthContext;
