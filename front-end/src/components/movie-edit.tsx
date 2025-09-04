"use client";

import { movieService } from "@/services/movieService";
import { ReviewService } from "@/services/reviewService";
import { CreateMovie, createMovie, genreEnum, GetMovies } from "@/types/movie";
import { CreateReview } from "@/types/review";
import { formatDate } from "@/utils/date";
import { IconArrowLeft, IconArrowRight, IconHome } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { StarRating } from "./starRating";
import { Button } from "./ui/button";

type TMovieEdit = {
  readonly data: GetMovies;
  readonly setMovie: Dispatch<SetStateAction<GetMovies | undefined>>;
};

export function MovieEdit({ data, setMovie }: TMovieEdit) {
  const [showEdit, setShowEdit] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [title, setTitle] = useState<GetMovies["title"]>(data.title);
  const [description, setDescription] = useState<GetMovies["description"]>(data.description);
  const [genre, setGenre] = useState<GetMovies["genre"]>(data.genre);
  const [coverImage, setCoverImage] = useState<GetMovies["coverImage"]>(data.coverImage);
  const [yearRelease, setYearRelease] = useState<GetMovies["yearRelease"]>(
    Number(data.yearRelease),
  );
  const [comment, setComment] = useState<CreateReview["comment"]>("");
  const [rating, setRating] = useState<GetMovies["rating"]>(Number(data.rating));
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setShowEdit(false);
    setIsLoading(true);
    setShowAddReview(false);

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

  const handleAddReview = async () => {
    setShowAddReview(false);
    setIsLoading(true);
    setShowEdit(false);

    try {
      const newReview = {
        movieId: data.id,
        comment,
        rating,
      };
      const updatedMovie = await ReviewService.create({ ...newReview });
      if (updatedMovie.status === 201) {
        toast.success("Review adicionado com sucesso!");
        setMovie(updatedMovie.data);
        window.location.reload();
      }
    } catch {
      toast.error("Erro ao adicionar review.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6  shadow-lg rounded-lg ">
      {!showEdit && !showAddReview && (
        <>
          <div className="p-2 flex justify-between">
            <IconArrowLeft onClick={() => router.back()} className="cursor-pointer" />
            <IconHome onClick={() => router.push("/dashboard")} className="cursor-pointer" />
            <IconArrowRight onClick={() => router.forward()} className="cursor-pointer" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">{data.title}</h1>
          <div className="flex justify-center p-4">
            <Image
              src={data.coverImage as string}
              alt={data.title}
              width={400}
              height={600}
              priority
            />
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
            <strong>Reviews:</strong>{" "}
            {data.reviews?.length ? data.reviews.length : "Nenhuma review disponível"}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            <p>Criado em: {formatDate(data.createdAt)}</p>
            <p>Atualizado em: {formatDate(data.updatedAt)}</p>
          </div>
          <div className="flex justify-around">
            <Button
              onClick={() => setShowAddReview(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Adicionar comentário
            </Button>
            <Button
              onClick={() => setShowEdit(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
            >
              Editar
            </Button>
          </div>
        </>
      )}
      {showEdit && (
        <div className="flex flex-col text-center">
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
          <div className="flex gap-2 justify-around">
            <Button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              Salvar
            </Button>
            <Button
              onClick={() => setShowEdit(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {showAddReview && (
        <div className="text-center ">
          <h2 className="text-2xl font-bold mb-4">Adicionar comentário</h2>
          <div className="mb-4">
            <label htmlFor="movie-rating" className="block font-semibold mb-1">
              Nota
            </label>
            <input
              id="movie-rating"
              min={0}
              max={10}
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded p-2"
              disabled={isLoading}
            />

            <label htmlFor="movie-comment" className="block font-semibold mb-1">
              Comentário
            </label>
            <textarea
              id="movie-comment"
              name="movie-comment"
              rows={10}
              cols={20}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2 justify-around">
            <Button
              onClick={handleAddReview}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              Salvar
            </Button>
            <Button
              onClick={() => setShowAddReview(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
