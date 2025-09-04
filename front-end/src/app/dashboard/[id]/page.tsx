"use client";

import { StarRating } from "@/components/starRating";
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
        <h2 className="text-center font-bold text-2xl p-2 mb-10">Comentários sobre o filme</h2>
        {review &&
          review.map((rev) => (
            <div key={rev.id} className="p-1">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{rev.user.name} </h2>
                <span className="text-gray-500">
                  Criado em: {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
              <StarRating rating={rev.rating} />
              <p className="text-gray-500  border-b mb-2">Comentário: {rev.comment}</p>
            </div>
          ))}

        {!review.length && <p className="text-gray-500">No reviews found.</p>}
      </div>
    </div>
  );
}
