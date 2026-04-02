import { createContext, useState, useContext, useEffect } from "react";
import { authAPI, productsAPI, addressAPI } from "../services/api";
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
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        fetchAddress();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  const fetchAddress = async () => {
    try {
      setAddressLoading(true);
      const response = await addressAPI.getAddress();
      setAddress(response.data.data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    } finally {
      setAddressLoading(false);
    }
  };

  const updateAddress = async (addressData) => {
    try {
      const response = await addressAPI.updateAddress(addressData);
      const updatedAddress = response.data.data;
      setAddress(updatedAddress);
      return { success: true, data: updatedAddress };
    } catch (error) {
      console.error("Error updating address:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update address",
      };
    }
  };

  const createAddress = async (addressData) => {
    try {
      const response = await addressAPI.createAddress(addressData);
      const newAddress = response.data.data;
      setAddress(newAddress);
      return { success: true, data: newAddress };
    } catch (error) {
      console.error("Error creating address:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create address",
      };
    }
  };

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
    setAddress(null);
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
    address,
    addressLoading,
    updateAddress,
    createAddress,
    fetchAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
