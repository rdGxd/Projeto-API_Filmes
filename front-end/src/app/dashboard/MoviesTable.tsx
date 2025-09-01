"use client";

import { DataTable } from "@/components/data-table";
import { movieService } from "@/services/movieService";
import { GetMovies } from "@/types/movie";
import { useEffect, useState } from "react";

export default function MoviesTable() {
  const [movies, setMovies] = useState<GetMovies[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies: GetMovies[] = await movieService.getAll();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return <DataTable data={movies} />;
}
