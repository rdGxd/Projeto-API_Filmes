"use client";

import { movieService } from "@/services/movieService";
import { GetReviews } from "@/types/review";
import Cookies from "js-cookie";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieDetails } from "../../../components/movieDetails";

export default function DashboardPage() {
  const { id } = useParams();
  const [review, setReview] = useState<GetReviews[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("accessToken");
      const reviews = await movieService.getReviews(id as string);
      console.log(reviews);
      setReview(reviews);

      if (!token) {
        return redirect("/");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-4 p-4 justify-center items-center content-center">
      <MovieDetails id={id as string} />
      <div className="flex flex-col p-2 border rounded w-full max-w-3xl">
        {review &&
          review.map((rev) => (
            <div key={rev.id}>
              <h2 className="font-semibold">
                Comentário de: <span className="font-bold">{rev.user.name}</span>
              </h2>
              <p className="text-gray-500">{rev.comment}</p>
            </div>
          ))}

        {!review.length && <p className="text-gray-500">No reviews found.</p>}
      </div>
    </div>
  );
}
