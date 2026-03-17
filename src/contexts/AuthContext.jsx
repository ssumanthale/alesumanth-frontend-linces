import { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, isAdmin = false) => {
    try {
      const response = await authAPI.login({ email, password });

      const { token: newToken, user: userData } = response.data.data;

      // Optional admin validation
      if (isAdmin && userData.accountType !== "admin") {
        throw new Error("Unauthorized admin access");
      }

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const register = async (name, email, password, accountType) => {
    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        accountType,
      });

      const { token: newToken, user: userData } = response.data.data;

      console.log(userData);

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);

      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => {
    return user?.accountType === "admin";
  };

  const isBrand = () => {
    return user?.accountType === "brand";
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated: !!token,
    isBrand,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
