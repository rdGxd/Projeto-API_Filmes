import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { api, apiWithAuth } from "./api";

export const userService = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await api.post("/auth/login", credentials);

      if (!response.data?.accessToken || !response.data?.refreshToken) {
        return false;
      }

      const { accessToken, refreshToken } = response.data;

      // Salva tokens em cookies com expiração
      Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); // 1h
      Cookies.set("refreshToken", refreshToken, { expires: 1 }); // 24h

      return true; // se quiser retornar info do usuário
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  async logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    redirect("/");
  },

  async getAll() {
    const response = await apiWithAuth.get("/users");
    return response.data;
  },

  async getById() {
    const response = await apiWithAuth.get(`/user/me`);
    return response.data;
  },

  async create(user: { name: string; email: string }) {
    const response = await apiWithAuth.post("/users", user);
    return response.data;
  },

  async update(userData: { name?: string; email?: string; password?: string }) {
    const response = await apiWithAuth.patch("/user/me", userData);
    return response.data;
  },
};
