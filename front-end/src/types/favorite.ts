import { apiWithAuth } from "@/services/api";

export const favoriteService = {
  addFavorite: async (movieId: string) => {
    // Logic to add a movie to favorites
  },
  removeFavorite: async (movieId: string) => {
    // Logic to remove a movie from favorites
  },
  getFavorites: async () => {
    const { data } = await apiWithAuth.get("/favorite");
    return data;
  },
};
