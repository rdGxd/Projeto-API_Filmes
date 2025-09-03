"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { apiWithAuth } from "@/services/api";
import { createMovie, CreateMovie, genreEnum } from "@/types/movie";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export function CreateMovieForm({ className, ...props }: React.ComponentProps<"div">) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState<genreEnum>(genreEnum.Ação);
  const [yearRelease, setYearRelease] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toast.dismiss();
    e.preventDefault();
    setIsLoading(true);

    try {
      const movieData: CreateMovie = createMovie.parse({
        title,
        description,
        genre,
        coverImage: "https://picsum.photos/200/300",
        yearRelease,
        rating,
      });
      const response = await apiWithAuth.post("/movie", movieData);

      if (response.status === 201) {
        toast.success("Filme criado com sucesso!");
        // Reset form
        setTitle("");
        setDescription("");
        setGenre(genreEnum.Ação);
        setYearRelease(0);
        setRating(0);
      }
    } catch (err: any) {
      console.log("Erro completo:", err);
      console.log("Response data:", err.response?.data);
      console.log("Status:", err.response?.status);

      if (err.response?.data?.message) {
        toast.error(`Erro: ${err.response.data.message}`);
      } else {
        toast.error("Erro ao criar filme");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 ml-1 justify-center text-center ")}>
      <Card>
        <CardHeader>
          <CardTitle>Digite os dados necessários para criação do filme</CardTitle>
          <CardDescription>Insira os dados abaixo para criar um novo filme</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="titleMovie">Título do Filme</Label>
                <Input
                  id="titleMovie"
                  type="text"
                  placeholder="O Senhor dos Anéis"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="descriptionMovie">Descrição do Filme</Label>
                <textarea
                  id="descriptionMovie"
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-full w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  )}
                  required
                  value={description}
                  placeholder="Um hobbit relutante embarca em uma jornada épica para destruir um anel poderoso."
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="genreMovie">Gênero</Label>
                <select
                  id="genreMovie"
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
              <div className="grid gap-3">
                <Label htmlFor="yearRelease">Ano de lançamento</Label>
                <Input
                  id="yearRelease"
                  type="text"
                  required
                  value={yearRelease}
                  onChange={(e) => setYearRelease(Number(e.target.value))}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="rating">Nota</Label>
                <Input
                  id="rating"
                  type="text"
                  required
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Criando filme..." : "Criar filme"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
