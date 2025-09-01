import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="typography-h1 text-primary">
      <h1 className="text-4xl font-bold">Welcome to the Movie API</h1>
      <p className="mt-4">Discover and explore a wide range of movies.</p>
      <Button variant="contained" color="primary">
        Meu Botão
      </Button>
    </div>
  );
}
