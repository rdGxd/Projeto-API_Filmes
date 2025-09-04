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
  withCredentials: true, // envia cookies automaticamente se forem HttpOnly
});

// Interceptor para adicionar token
apiWithAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(error)),
);

// Interceptor para resposta e refresh
apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Evita loop infinito
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          // Chama endpoint de refresh
          const res = await api.post("/auth/refresh", { refreshToken });
          const newAccessToken = res.data.accessToken;

          // Atualiza cookies
          Cookies.set("accessToken", newAccessToken, { expires: 1 / 24 }); // 1h
          Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 }); // 24h

          // Reenvia requisição original
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiWithAuth(originalRequest);
        } catch {
          // Refresh falhou, remove tokens e redireciona
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error(error));
  },
);
