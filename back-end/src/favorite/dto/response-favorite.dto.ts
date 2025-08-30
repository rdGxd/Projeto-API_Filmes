export class ResponseFavoriteDto {
  id: string;
  user: {
    userId: string;
    userName: string;
  };
  movie: {
    movieId: string;
    movieTitle: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
