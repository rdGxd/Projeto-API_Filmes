"use client";

import { GetMovies } from "@/types/movie";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";

function TitleCell({ movie }: { readonly movie: GetMovies }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Link clicado para id:", movie.id);
    router.push(`/dashboard/${movie.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-transparent border-none cursor-pointer p-2 text-left w-full  transition-colors hover:underline"
    >
      {movie.title}
    </button>
  );
}

export function SimpleDataTable({ data }: { readonly data: readonly GetMovies[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left border-b border-gray-300">Title</th>
            <th className="p-2 text-left border-b border-gray-300">Description</th>
            <th className="p-2 text-left border-b border-gray-300">Genre</th>
            <th className="p-2 text-left border-b border-gray-300">Year</th>
            <th className="p-2 text-left border-b border-gray-300">Rating</th>
            <th className="p-2 text-left border-b border-gray-300">Created At</th>
            <th className="p-2 text-left border-b border-gray-300">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movie) => (
            <tr key={movie.id} className="">
              <td className="p-2 border-b border-gray-200">
                <TitleCell movie={movie} />
              </td>
              <td className="p-2 border-b border-gray-200 max-w-48">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">{movie.description}</div>
              </td>
              <td className="p-2 border-b border-gray-200">{movie.genre}</td>
              <td className="p-2 border-b border-gray-200">{movie.yearRelease}</td>
              <td className="p-2 border-b border-gray-200">{movie.rating}</td>
              <td className="p-2 border-b border-gray-200">{formatDate(movie.createdAt)}</td>
              <td className="p-2 border-b border-gray-200">{formatDate(movie.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
