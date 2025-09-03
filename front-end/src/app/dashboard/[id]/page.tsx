"use client";

import { useParams } from "next/navigation";
import { MovieDetails } from "../../../components/movieDetails";

export default function DashboardPage() {
  const { id } = useParams();

  return (
    <div>
      <MovieDetails id={id as string} />
    </div>
  );
}
