import { GetMovies } from "@/types/movie";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columnsMovie";

export function DataTable({ data }: { readonly data: readonly GetMovies[] }) {
  const table = useReactTable({
    data: [...data],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 text-left border-b">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 border-b">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
