import { apiWithAuth } from "@/services/api";

export const favoriteService = {
  addFavorite: async (movieId: string) => {
    const { data } = await apiWithAuth.post("/favorite", { movieId });
    return data;
  },

  removeFavorite: async (movieId: string) => {
    const { data } = await apiWithAuth.delete(`/favorite/${movieId}`);
    return data;
  },
  getFavorites: async () => {
    const { data } = await apiWithAuth.get("/favorite");
    return data;
  },
};
