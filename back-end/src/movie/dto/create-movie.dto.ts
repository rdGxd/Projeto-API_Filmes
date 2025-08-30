import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { IsValidYear } from 'src/common/validators/movie.validators';

export class CreateMovieDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
  @Transform(({ value }) => value?.toString().trim()) // Sanitização: remove espaços
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  @Length(10, 1000, {
    message: 'Description must be between 10 and 1000 characters',
  })
  @Transform(({ value }) => value?.toString().trim())
  description: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre cannot be empty' })
  @Length(2, 50, { message: 'Genre must be between 2 and 50 characters' })
  @Transform(({ value }) => value?.toString().trim().toLowerCase()) // Padroniza para minúsculo
  genre: string;

  @IsNumber({}, { message: 'Year must be a number' })
  @Min(1800, { message: 'Year must be at least 1800' })
  @Max(new Date().getFullYear() + 5, {
    message: `Year cannot be more than ${new Date().getFullYear() + 5}`,
  })
  @IsValidYear()
  yearRelease: number;

  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(10, { message: 'Rating must be at most 10' })
  @Transform(({ value }) => {
    // Converte string para número e arredonda para 1 casa decimal
    const num = Number(value);
    return Math.round(num * 10) / 10;
  })
  rating: number;
}
