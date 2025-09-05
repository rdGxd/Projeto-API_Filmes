"use client";

import { SimpleDataTable } from "@/components/simple-data-table";
import { favoriteService } from "@/services/favoriteService";
import { movieService } from "@/services/movieService";
import { TFavorite } from "@/types/favorite";
import { GetMovies } from "@/types/movie";
import { useEffect, useState } from "react";
import { SimpleDataFavorite } from "../simple-data-favorite";

type TMoviesTable = {
  mode: "favorite" | "list";
};

export default function MoviesTable({ mode }: TMoviesTable) {
  const [movies, setMovies] = useState<GetMovies[]>([]);
  const [favorites, setFavorites] = useState<TFavorite[]>([]);

  useEffect(() => {
    let isMounted = true;

    if (mode === "favorite") {
      const fetchFavorites = async () => {
        const favorites: TFavorite[] = await favoriteService.getFavorites();
        if (isMounted) {
          setFavorites(favorites);
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

  return (
    <>
      {mode === "favorite" ? (
        <SimpleDataFavorite data={favorites} set={setFavorites} />
      ) : (
        <SimpleDataTable data={movies} set={setMovies} />
      )}
    </>
  );
}
