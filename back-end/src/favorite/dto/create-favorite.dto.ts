import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  movieId: string;
}
