export class ResponseFavoriteDto {
  idFavorite: string;
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
