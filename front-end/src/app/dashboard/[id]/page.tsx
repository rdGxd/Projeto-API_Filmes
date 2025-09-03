"use client";

import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { MovieDetails } from "../../../components/movieDetails";

export default function DashboardPage() {
  const { id } = useParams();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      return redirect("/");
    }
  }, []);

  return (
    <div>
      <MovieDetails id={id as string} />
    </div>
  );
}
