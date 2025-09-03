import z from "zod";

export enum genreEnum {
  Ação = "Ação",
  Comédia = "Comédia",
  Drama = "Drama",
  Ficção_Científica = "Ficção Científica",
  Terror = "Terror",
  Romance = "Romance",
  Animação = "Animação",
}

export const createMovie = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  genre: z.enum([
    genreEnum.Ação,
    genreEnum.Comédia,
    genreEnum.Drama,
    genreEnum.Ficção_Científica,
    genreEnum.Terror,
    genreEnum.Romance,
    genreEnum.Animação,
  ]),
  coverImage: z.url(),
  yearRelease: z.number().min(1888).max(new Date().getFullYear()),
  rating: z.number().min(0).max(10),
});

export const getMovies = z.object({
  id: z.uuid(),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  rating: z.number().min(0).max(10),
  genre: z.string().min(2).max(50),
  yearRelease: z.number().min(1888).max(new Date().getFullYear()),
  createdAt: z.string(),
  updatedAt: z.string(),
  reviews: z.array(z.any()).optional(),
  coverImage: z.url().optional(),
});

export type CreateMovie = z.infer<typeof createMovie>;
export type GetMovies = z.infer<typeof getMovies>;
