"use client";

import { favoriteService } from "@/services/favoriteService";
import { TFavorite } from "@/types/favorite";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { Dispatch } from "react";
import { toast } from "react-toastify";
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

export function SimpleDataFavorite({
  data,
  set,
}: {
  readonly set: Dispatch<TFavorite[]>;
  readonly data: readonly TFavorite[];
}) {
  const handleRemoveFavorite = async (id: string) => {
    try {
      const removeFavorite = await favoriteService.removeFavorite(id);
      if (removeFavorite.status === 200) {
        toast.success("Filme removido dos favoritos");
        window.location.reload();
      }
      return toast.error("Erro ao remover favorito");
    } catch (error: any) {
      toast.error("Erro ao remover favorito");
      console.error("Erro ao remover favorito:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status:", error.response?.status);
    }
  };

  return (
    <div className="w-full overflow-x-auto text-center">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl p-4 font-bold">Filmes Favoritados</h1>
        <Filters set={set} />
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
          {data.map((selectedFavorite) => (
            <tr key={selectedFavorite.id}>
              <td className="p-2 border-b border-gray-200">
                <Cell id={selectedFavorite.movie.id} value={selectedFavorite.movie.title} />
              </td>
              <td className="p-2 border-b border-gray-200 max-w-48">
                <Cell id={selectedFavorite.movie.id} value={selectedFavorite.movie.description} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={selectedFavorite.movie.id} value={selectedFavorite.movie.genre} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell
                  id={selectedFavorite.movie.id}
                  valueNumber={selectedFavorite.movie.yearRelease}
                />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell id={selectedFavorite.movie.id} valueNumber={selectedFavorite.movie.rating} />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell
                  id={selectedFavorite.movie.id}
                  value={formatDate(selectedFavorite.createdAt.toString())}
                />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Cell
                  id={selectedFavorite.movie.id}
                  value={formatDate(selectedFavorite.updatedAt.toString())}
                />
              </td>
              <td className="p-2 border-b border-gray-200">
                <Button
                  variant="destructive"
                  className="mr-4 cursor-pointer"
                  onClick={() => handleRemoveFavorite(selectedFavorite.id)}
                >
                  Remover dos favoritos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
