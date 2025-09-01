"use client";

import { GetMovies } from "@/types/movie";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../utils/date";

const columnDefs: { key: keyof GetMovies; label: string; isDate?: boolean }[] = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "genre", label: "Genre" },
  { key: "yearRelease", label: "Year" },
  { key: "rating", label: "Rating" },
  { key: "createdAt", label: "Created At", isDate: true },
  { key: "updatedAt", label: "Updated At", isDate: true },
];

export const columns: ColumnDef<GetMovies>[] = columnDefs.map((col) => ({
  accessorKey: col.key,
  header: col.label,
  cell: ({ row }) => {
    const value = row.original[col.key];

    if (col.isDate && typeof value === "string") {
      return <div className="p-2">{formatDate(value)}</div>;
    }

    return (
      <div className="truncate max-w-xs p-2" title={String(value)}>
        {value}
      </div>
    );
  },
}));
