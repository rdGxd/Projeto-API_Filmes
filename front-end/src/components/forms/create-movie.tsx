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
                <label htmlFor="movie-description" className="block font-semibold mb-1">
                  Descrição
                </label>
                <textarea
                  id="movie-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2"
                  disabled={isLoading}
                  required
                  placeholder="Um hobbit relutante embarca em uma jornada épica para destruir um anel poderoso."
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="genreMovie">Gênero</Label>
                <select
                  id="genreMovie"
                  disabled={isLoading}
                  value={genre}
                  className="border border-gray-300 rounded px-3 py-2"
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
