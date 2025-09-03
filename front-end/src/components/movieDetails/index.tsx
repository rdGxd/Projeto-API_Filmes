"use client";

import { MovieEdit } from "@/components/movie-edit";
import { movieService } from "@/services/movieService";
import { GetMovies } from "@/types/movie";
import { useEffect, useState } from "react";

export function MovieDetails(props: { readonly id: string }) {
  const [movie, setMovie] = useState<GetMovies>();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await movieService.getById(props.id);
      setMovie(response);
    };
    fetchMovie();
  }, [props.id]);

  return <div>{movie && <MovieEdit data={movie} setMovie={setMovie}  />}</div>;
}
