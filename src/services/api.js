import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: (credentials) => apiClient.post("/auth/login", credentials),
  register: (userData) => apiClient.post("/auth/register", userData),
  logout: () => apiClient.post("/auth/logout"),
};

export const productsAPI = {
  getAll: () => apiClient.get("/products"),
  getById: (id) => apiClient.get(`/products/${id}`),
  getFeatured: () => apiClient.get("/products"),
  create: (productData) => apiClient.post("/products", productData),
  update: (id, productData) => apiClient.put(`/products/${id}`, productData),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

export const quotesAPI = {
  create: (quoteData) => apiClient.post("/quotes", quoteData),
  getAll: (params) => apiClient.get("/quotes", { params }),
  getById: (id) => apiClient.get(`/quotes/${id}`),
};

export const contactAPI = {
  send: (messageData) => apiClient.post("/contact", messageData),
};

export const ordersAPI = {
  create: (orderData) => apiClient.post("/orders/checkout", orderData),
  getAll: (params) => apiClient.get("/orders", { params }),
  getById: (id) => apiClient.get(`/orders/${id}`),
};

export const cartAPI = {
  getCart: () => apiClient.get("/cart"),

  add: (data) => apiClient.post("/cart/add", data),

  update: (data) => apiClient.put("/cart/update", data),

  remove: (id) => apiClient.delete(`/cart/remove/${id}`),
};
export default apiClient;
