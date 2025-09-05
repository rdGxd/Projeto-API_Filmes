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

  async create(movie: CreateMovie) {
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

  async delete(id: string) {
    const response = await apiWithAuth.delete(`/movie/${id}`);
    return response;
  },

  async filterMovies(filter: string) {
    const response = await apiWithAuth.get(`/movie/filter/${filter}`);
    console.log("Response data:", response.data);
    return response.data;
  },

  async filter(filters: { genre?: string; year?: number; minRating?: number }) {
    const params = new URLSearchParams();
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.year) params.append("year", filters.year.toString());
    if (filters.minRating) params.append("minRating", filters.minRating.toString());

    const response = await apiWithAuth.get(`/movie/search?${params.toString()}`);
    return response.data;
  },
};
