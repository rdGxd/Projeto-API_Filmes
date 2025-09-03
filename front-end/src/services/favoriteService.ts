import { apiWithAuth } from "@/services/api";

export const favoriteService = {
  addFavorite: async (movieId: string) => {
    const { data } = await apiWithAuth.post("/favorite", { movieId });
    return data;
  },

  removeFavorite: async (movieId: string) => {
    const response = await apiWithAuth.delete(`/favorite/${movieId}`);
    return response;
  },
  getFavorites: async () => {
    const { data } = await apiWithAuth.get("/favorite");
    return data;
  },
};
