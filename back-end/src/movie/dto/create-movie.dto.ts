import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';
import { IsValidYear } from 'src/common/validators/movie.validators';
import { genreEnum } from '../enums/genreEnum';

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

  @IsNotEmpty({ message: 'Cover image URL cannot be empty' })
  @IsString({ message: 'Cover image URL must be a string' })
  @IsUrl({}, { message: 'Cover image must be a valid URL' })
  coverImage: string;

  @IsEnum(genreEnum, { each: true, message: 'Invalid genre' })
  @IsNotEmpty({ message: 'Genre cannot be empty' })
  genre: genreEnum;

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
    return Number(value);
  })
  rating: number;
}
