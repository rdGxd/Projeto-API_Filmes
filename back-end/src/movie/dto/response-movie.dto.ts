import { IsDate, IsString } from 'class-validator';

export class ResponseMovieDto {
  @IsString()
  idFavorite: string;
  @IsString()
  userId: string;
  @IsString()
  movieId: string;
  @IsString()
  movieTitle: string;
  @IsString()
  movieDescription: string;
  @IsString()
  movieRating: string;
  @IsString()
  movieGenre: string;
  @IsString()
  movieYearRelease: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
