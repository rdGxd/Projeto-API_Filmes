"use client";

import { SimpleDataTable } from "@/components/simple-data-table";
import { movieService } from "@/services/movieService";
import { favoriteService } from "@/types/favorite";
import { GetMovies } from "@/types/movie";
import { useEffect, useState } from "react";

type TMoviesTable = {
  mode: "favorite" | "list";
};

export default function MoviesTable({ mode }: TMoviesTable) {
  const [movies, setMovies] = useState<GetMovies[]>([]);

  useEffect(() => {
    let isMounted = true;

    if (mode === "favorite") {
      const fetchFavorites = async () => {
        const favorites: GetMovies[] = await favoriteService.getFavorites();
        if (isMounted) {
          setMovies(favorites);
        }
      };

      fetchFavorites();
    }

    if (mode === "list") {
      const fetchMovies = async () => {
        const movies: GetMovies[] = await movieService.getAll();
        if (isMounted) {
          setMovies(movies);
        }
      };

      fetchMovies();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return <SimpleDataTable data={movies} />;
}
