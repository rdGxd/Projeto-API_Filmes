import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { movieService } from "@/services/movieService";
import { TFavorite } from "@/types/favorite";
import { GetMovies } from "@/types/movie";
import { Label } from "@radix-ui/react-label";
import { Dispatch, useState } from "react";

export function Filters({ set }: { readonly set: Dispatch<GetMovies[]> | Dispatch<TFavorite[]> }) {
  const [selectedFilters, setSelectedFilters] = useState<string>("");

  const handleClick = async () => {
    const response = await movieService.filterMovies(selectedFilters);
    console.log("Filtered movies:", response);
    set(response);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Selecione pelo o que vc deseja filtrar</h4>
            <p className="text-muted-foreground text-sm">Defina as dimensões para a camada.</p>
          </div>
          <div className="grid gap-2">
            <RadioGroup value={selectedFilters} onValueChange={setSelectedFilters}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="genre" id="genre" className="border border-purple-500" />
                <Label htmlFor="genre">Gênero</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="rating" className="border border-purple-500" />
                <Label htmlFor="rating">Avaliação</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="year" id="year" className="border border-purple-500" />
                <Label htmlFor="year">Ano de lançamento</Label>
              </div>
              <div className="pt-4">
                <Button variant="outline" onClick={handleClick}>
                  Aplicar Filtros
                </Button>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
