import Cookies from "js-cookie";
import { api } from "./api";

export const movieService = {
  async getAll() {
    const token = Cookies.get("accessToken");
    const response = await api.get("/movie", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  async getById(id: number) {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  },

  async create(user: { name: string; email: string }) {
    const response = await api.post("/movie", user);
    return response.data;
  },
};
