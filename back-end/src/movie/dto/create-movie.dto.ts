import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  genre: string;

  @IsString()
  yearRelease: string;

  @IsString()
  rating: string;
}
