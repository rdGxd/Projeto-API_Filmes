import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export function Filters() {
  const [selectedFilters, setSelectedFilters] = useState<string>("");

  const handleClick = () => {
    switch (selectedFilters) {
      case "genre":
        console.log("filter by genre");
        break;
      case "rating":
        console.log("filter by rating");
        break;
      case "release-year":
        console.log("filter by release year");
        break;
    }
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
                <Label htmlFor="rating">Nota</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="release-year"
                  id="release-year"
                  className="border border-purple-500"
                />
                <Label htmlFor="release-year">Ano de lançamento</Label>
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
