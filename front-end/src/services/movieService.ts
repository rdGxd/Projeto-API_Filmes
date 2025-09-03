import { GetMovies } from "@/types/movie";
import { apiWithAuth } from "./api";

export const movieService = {
  async getAll() {
    const { data } = await apiWithAuth.get("/movie");

    return data as GetMovies[];
  },

  async getById(id: string) {
    const { data } = await apiWithAuth.get(`/movie/${id}`);

    return data as GetMovies;
  },

  async create(movie: GetMovies) {
    const { data } = await apiWithAuth.post("/movie", movie);
    return data as GetMovies;
  },

  async update(movie: GetMovies) {
    const { data } = await apiWithAuth.patch(`/movie/${movie.id}`, movie);
    return data;
  },
};
