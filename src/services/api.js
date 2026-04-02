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
  getAll: () => apiClient.get("/products?limit=100"),
  getById: (id) => apiClient.get(`/products/${id}`),
  getFeatured: () => apiClient.get("/products"),
  create: (productData) => apiClient.post("/products", productData),
  update: (id, productData) => apiClient.put(`/products/${id}`, productData),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

// export const quotesAPI = {
//   create: (quoteData) => apiClient.post("/quotes", quoteData),
//   get: (params) => apiClient.get("/quotes", { params }),
//   getAll: () => apiClient.get("/quotes/all"),
//   getById: (id) => apiClient.get(`/quotes/${id}`),
//   getByIdAdmin: (id) => apiClient.get(`/quotes/all/${id}`),
// };


export const quotesAPI = {
  // ---------------- USER ----------------

  // Create quote request
  create: (quoteData) => apiClient.post("/quotes", quoteData),

  // Get logged-in user's quotes (paginated)d
  getMyQuotes: (params) => apiClient.get("/quotes", { params }),

  // Get single quote (user)
  getById: (id) => apiClient.get(`/quotes/${id}`),


  // ---------------- ADMIN ----------------

  // Get all quotes (admin)
  getAll: (params) => apiClient.get("/quotes/all", { params }),

  // Get single quote (admin)
  getByIdAdmin: (id) => apiClient.get(`/quotes/all/${id}`),

  // ✅ NEW: Update quote status + response
  updateStatus: (id, data) =>
    apiClient.put(`/quotes/admin/${id}/status`, data),
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

export const addressAPI = {
  getAddress: () => apiClient.get("/address"),
  updateAddress: (addressData) => apiClient.put("/address", addressData),
  createAddress: (addressData) => apiClient.post("/address", addressData),
};

export default apiClient;
