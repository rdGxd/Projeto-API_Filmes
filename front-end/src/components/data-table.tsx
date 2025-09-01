"use client";

import { GetMovies } from "@/types/movie";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { columns } from "./columnsMovie";

export function DataTable({ data }: { readonly data: readonly GetMovies[] }) {
  const router = useRouter();
  const table = useReactTable({
    data: [...data],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Botão de teste completamente isolado
  const handleTestClick = () => {
    console.log("TESTE: Botão isolado funcionou!");
    router.push("/dashboard/test-id");
  };

  return (
    <div>
      {/* Botão de teste fora da tabela */}
      <div style={{ marginBottom: "20px", padding: "20px", border: "2px solid red" }}>
        <h3>TESTE DE DEPURAÇÃO:</h3>
        <button
          onClick={handleTestClick}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          CLIQUE AQUI PARA TESTAR
        </button>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      borderBottom: "1px solid #ccc",
                      pointerEvents: "none",
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  pointerEvents: "none",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                      pointerEvents: "auto",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
