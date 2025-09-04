import { CreateMovie, GetMovies } from "@/types/movie";
import { GetReviews } from "@/types/review";
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

  async update(id: string, movie: CreateMovie) {
    const { data } = await apiWithAuth.patch(`/movie/${id}`, movie);
    return data;
  },

  async getReviews(id: string) {
    const { reviews } = await this.getById(id);
    return reviews as GetReviews[];
  },
};
