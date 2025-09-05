import { favoriteService } from "@/services/favoriteService";
import { useState } from "react";

export interface Favorite {
  id: string;
  movieId: string;
  userId: string;
  createdAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await favoriteService.getFavorites();
      setFavorites(data || []);
    } catch (err) {
      setError("Failed to fetch favorites");
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (movieId: string) => {
    setLoading(true);
    setError(null);
    try {
      const newFavorite = await favoriteService.addFavorite(movieId);
      setFavorites((prev) => [...(prev || []), newFavorite]);
      return newFavorite;
    } catch (err) {
      setError("Failed to add favorite");
      console.error("Error adding favorite:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    setLoading(true);
    setError(null);
    try {
      await favoriteService.removeFavorite(favoriteId);
      setFavorites((prev) => (prev || []).filter((fav) => fav.id !== favoriteId));
    } catch (err) {
      setError("Failed to remove favorite");
      console.error("Error removing favorite:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    favorites,
    loading,
    error,
    getFavorites: fetchFavorites,
    addFavorite,
    removeFavorite,
  };
};
