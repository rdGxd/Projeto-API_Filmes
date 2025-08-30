import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class FilterMovieDto {
  @IsOptional()
  @IsString({ message: 'Genre must be a string' })
  @Length(2, 50, { message: 'Genre must be between 2 and 50 characters' })
  @Transform(({ value }) => {
    if (!value) return undefined;
    return value.toString().trim().toLowerCase();
  })
  genre?: string;

  @IsOptional()
  @IsNumberString({}, { message: 'Year must be a valid year format' })
  @Length(4, 4, { message: 'Year must be exactly 4 digits' })
  @Matches(/^\d{4}$/, { message: 'Year must contain only digits' })
  @Transform(({ value }) => {
    if (!value) return undefined;
    return value.toString().trim();
  })
  year?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(10, { message: 'Rating must be at most 10' })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    return parseFloat(value);
  })
  minRating?: number;

  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  @Length(1, 100, { message: 'Search must be between 1 and 100 characters' })
  @Transform(({ value }) => {
    if (!value) return undefined;
    // Sanitização: remove caracteres especiais perigosos
    return value
      .toString()
      .trim()
      .replace(/[<>]/g, '') // Remove < e >
      .replace(/['"]/g, '') // Remove aspas
      .substring(0, 100); // Limita tamanho
  })
  search?: string;

  // Paginação
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be at least 1' })
  @Transform(({ value }) => {
    if (!value) return 1;
    return parseInt(value) || 1;
  })
  page?: number = 1;

  @IsOptional()
  @IsNumber({}, { message: 'Limit must be a number' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(100, { message: 'Limit must be at most 100' })
  @Transform(({ value }) => {
    if (!value) return 10;
    return parseInt(value) || 10;
  })
  limit?: number = 10;
}
