import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithAuth = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token dinamicamente
apiWithAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

// Interceptor para resposta - lidar com tokens expirados
apiWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido, remover cookies e redirecionar
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      // Opcional: redirecionar para login
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);
