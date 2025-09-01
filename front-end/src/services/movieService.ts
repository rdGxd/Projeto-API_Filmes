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

  async getById(id: string) {
    const { data } = await api.get(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    return data as GetMovies;
  },

  async create(user: { name: string; email: string }) {
    const { data } = await api.post("/movie", user);
    return data as GetMovies;
  },

  async update(movie: GetMovies) {
    const { data } = await api.patch(`/movie/${movie.id}`, movie);
    return data;
  },
};
