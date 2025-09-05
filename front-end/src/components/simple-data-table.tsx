"use client";

import { favoriteService } from "@/services/favoriteService";
import { movieService } from "@/services/movieService";
import { GetMovies } from "@/types/movie";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { Filters } from "./filter";
import { Button } from "./ui/button";

function Cell({
  id,
  value,
  valueNumber,
}: {
  readonly id: string;
  readonly value?: string;
  readonly valueNumber?: number;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/dashboard/${id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-transparent border-none cursor-pointer p-2  w-full  transition-colors hover:underline"
    >
      {value ?? valueNumber}
    </button>
  );
}

export function SimpleDataTable({ data }: { readonly data: readonly GetMovies[] }) {
  const handleFavorite = async (id: string) => {
    try {
      const addFavorite = await favoriteService.addFavorite(id);
      console.log("Favorito adicionado:", addFavorite);
    } catch (error: any) {
      console.error("Erro ao adicionar favorito:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deleteFavorite = await movieService.delete(id);
      console.log("Favorito removido:", deleteFavorite);
    } catch (error: any) {
      console.error("Erro ao remover favorito:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
  };

  const handleFilters = () => {
    // Implement filter logic here
  };

  return (
    <div className="w-full overflow-x-auto text-center">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl p-4 font-bold">All Movies</h1>
        <Filters />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2  border-b border-gray-300">Title</th>
            <th className="p-2  border-b border-gray-300">Description</th>
            <th className="p-2  border-b border-gray-300">Genre</th>
            <th className="p-2  border-b border-gray-300">Year</th>
            <th className="p-2  border-b border-gray-300">Rating</th>
            <th className="p-2  border-b border-gray-300">Created At</th>
            <th className="p-2  border-b border-gray-300">Updated At</th>
            <th className="p-2  border-b border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movie) => (
            <tr key={movie.id}>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} value={movie.title} />
              </td>
              <td className="p-2 border-b border-gray-200 max-w-48">
                <Cell id={movie.id} value={movie.description} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} value={movie.genre} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} valueNumber={movie.yearRelease} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} valueNumber={movie.rating} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} value={formatDate(movie.createdAt)} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={movie.id} value={formatDate(movie.updatedAt)} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Button
                  variant="default"
                  className="mr-4 cursor-pointer"
                  onClick={() => handleFavorite(movie.id)}
                >
                  Favoritar
                </Button>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
