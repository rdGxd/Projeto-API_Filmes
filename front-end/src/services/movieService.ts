import { GetMovies } from "@/types/movie";
import Cookies from "js-cookie";
import { api } from "./api";

export const movieService = {
  async getAll() {
    const token = Cookies.get("accessToken");
    const { data } = await api.get("/movie", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data as GetMovies[];
  },

  async getById(id: number) {
    const { data } = await api.get(`/movie/${id}`);
    return data as GetMovies;
  },

  async create(user: { name: string; email: string }) {
    const { data } = await api.post("/movie", user);
    return data as GetMovies;
  },
};
