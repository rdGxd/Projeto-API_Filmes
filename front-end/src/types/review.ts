import z from "zod";
import { getMovies } from "./movie";

export const getReviews = z.object({
  id: z.uuid(),

  rating: z.number().min(1).max(10),

  comment: z.string(),

  createdAt: z.date(),

  updatedAt: z.date(),

  movie: getMovies,

  user: z.object({
    id: z.uuid(),

    name: z.string(),

    email: z.string(),

    createdAt: z.date(),

    updatedAt: z.date(),
  }),
});

export const createReview = z.object({
  movieId: z.uuid(),
  rating: z.number().min(1).max(10),
  comment: z.string().min(10).max(300),
});

export type CreateReview = z.infer<typeof createReview>;
export type GetReviews = z.infer<typeof getReviews>;
