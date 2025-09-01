import z from "zod";

const createMovie = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
});

const getMovies = z.object({
  id: z.uuid(),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  rating: z.number().min(0).max(10),
  genre: z.string().min(2).max(50),
  yearRelease: z.number().min(1888).max(new Date().getFullYear()),
  createdAt: z.string(),
  updatedAt: z.string(),
  reviews: z.array(z.any()).optional(),
});

export type CreateMovie = z.infer<typeof createMovie>;
export type GetMovies = z.infer<typeof getMovies>;
