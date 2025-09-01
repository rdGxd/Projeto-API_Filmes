import z from "zod";

export const movieSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  rating: z.number(),
  genre: z.string(),
  yearRelease: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  reviews: z.array(z.any()), // você pode substituir z.any() pelo schema de review se tiver
});

export type MovieType = z.infer<typeof movieSchema>;
