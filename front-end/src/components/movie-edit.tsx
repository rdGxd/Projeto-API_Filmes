"use client";

import { movieService } from "@/services/movieService";
import { CreateMovie, createMovie, genreEnum, GetMovies } from "@/types/movie";
import { formatDate } from "@/utils/date";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { StarRating } from "./starRating";

type TMovieEdit = {
  readonly data: GetMovies;
  readonly setMovie: Dispatch<SetStateAction<GetMovies | undefined>>;
};

export function MovieEdit({ data, setMovie }: TMovieEdit) {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState<GetMovies["title"]>(data.title);
  const [description, setDescription] = useState<GetMovies["description"]>(data.description);
  const [genre, setGenre] = useState<GetMovies["genre"]>(data.genre);
  const [coverImage, setCoverImage] = useState<GetMovies["coverImage"]>(data.coverImage);
  const [yearRelease, setYearRelease] = useState<GetMovies["yearRelease"]>(Number(data.yearRelease));
  const [rating, setRating] = useState<GetMovies["rating"]>(Number(data.rating));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setShowEdit(false);
    setIsLoading(true);

    try {
      const updatedData: CreateMovie = createMovie.parse({
        title,
        description,
        genre,
        coverImage,
        yearRelease,
        rating,
      });
      const updatedMovie = await movieService.update(data.id, updatedData);
      if (updatedMovie) {
        toast.success("Filme atualizado com sucesso!");
        setMovie(updatedMovie);
      }
    } catch (error) {
      toast.error("Erro ao atualizar filme.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6  shadow-lg rounded-lg">
      <div className="p-2 flex justify-between">
        <IconArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <IconArrowRight onClick={() => router.forward()} className="cursor-pointer" />
      </div>
      {!showEdit && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
          <div className="flex justify-center p-4">
            <Image src={data.coverImage as string} alt={data.title} width={400} height={600} priority />
          </div>
          <p className="mb-4">{data.description}</p>

          <div className="mb-2">
            <strong>Ano de lançamento:</strong> {data.yearRelease}
          </div>
          <div className="mb-2">
            <strong>Gênero:</strong> <span className="px-2 py-1 rounded">{data.genre}</span>
          </div>
          <div className="mb-2">
            <strong>Avaliação:</strong> <StarRating rating={data.rating} />
          </div>
          <div className="mb-2">
            <strong>Reviews:</strong> {data.reviews?.length ? data.reviews.join(", ") : "Nenhuma review disponível"}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            <p>Criado em: {formatDate(data.createdAt)}</p>
            <p>Atualizado em: {formatDate(data.updatedAt)}</p>
          </div>
          <button
            onClick={() => setShowEdit(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Editar
          </button>
        </>
      )}
      {showEdit && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Editar Filme</h2>
          <div className="mb-4">
            <label htmlFor="movie-title" className="block font-semibold mb-1">
              Título
            </label>
            <input
              id="movie-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="movie-description" className="block font-semibold mb-1">
              Descrição
            </label>
            <textarea
              id="movie-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="movie-image" className="block font-semibold mb-1">
              Image
            </label>
            <input
              id="movie-image"
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />
            <div className="flex justify-center p-4">
              <Image src={coverImage || ""} alt={title || ""} width={400} height={600} priority />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="movie-rating" className="block font-semibold mb-1">
              Rating
            </label>
            <input
              id="movie-rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <div className="grid gap-3">
              <label htmlFor="genre-movie" className="block font-semibold mb-1">
                Gênero
              </label>
              <select
                id="genre-movie"
                disabled={isLoading}
                value={genre}
                onChange={(e) => setGenre(e.target.value as genreEnum)}
              >
                {Object.values(genreEnum).map((value: string) => (
                  <option key={value} value={value} className="bg-blue-100">
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="movie-yearRelease" className="block font-semibold mb-1">
              Ano de Lançamento
            </label>
            <input
              id="movie-yearRelease"
              type="number"
              value={yearRelease}
              onChange={(e) => setYearRelease(Number(e.target.value))}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              Salvar
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
