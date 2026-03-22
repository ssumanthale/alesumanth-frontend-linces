import { createContext, useState, useContext, useEffect } from "react";
import { authAPI, productsAPI } from "../services/api";
import { useLanguage } from "./LanguageContext";

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
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

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

      return { success: true, isAdmin: userData.accountType === "admin" };
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
  };

  const isCustomer = () => {
    return user?.accountType === "customer";
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await productsAPI.getAll();
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(t("products.error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);
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
    isCustomer,
    products,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
