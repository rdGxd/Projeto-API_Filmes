import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  @IsUUID()
  movieId: string;
}
