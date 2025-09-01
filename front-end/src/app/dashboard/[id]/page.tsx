"use client";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams();
  // O parâmetro pode ser string ou objeto dependendo da configuração
  let id: string | undefined = undefined;
  if (typeof params === "object" && params !== null && "id" in params) {
    id = (params as any).id;
  } else if (typeof params === "string") {
    id = params;
  }

  return (
    <div>
      <div>Slug: {id ?? "id não encontrado"}</div>
      <pre>params: {JSON.stringify(params)}</pre>
    </div>
  );
}
