"use client";

import { SimpleDataTable } from "@/components/simple-data-table";
import { movieService } from "@/services/movieService";
import { GetMovies } from "@/types/movie";
import { useEffect, useState } from "react";

export default function MoviesTable() {
  const [movies, setMovies] = useState<GetMovies[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      const movies: GetMovies[] = await movieService.getAll();
      if (isMounted) {
        setMovies(movies);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return <SimpleDataTable data={movies} />;
}
