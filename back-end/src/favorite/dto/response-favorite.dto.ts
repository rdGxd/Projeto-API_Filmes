export class ResponseFavoriteDto {
  id: string;
  user: {
    id: string;
    name: string;
  };
  movie: {
    id: string;
    title: string;
    description: string;
    genre: string;
    yearRelease: number;
    rating: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
