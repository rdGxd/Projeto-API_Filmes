import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(10, { message: 'Rating must be at most 10' })
  @Transform(({ value }) => {
    // Converte string para número e arredonda para 1 casa decimal
    const num = Number(value);
    return Math.round(num * 10) / 10;
  })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  @Length(10, 300, { message: 'Comment must be between 10 and 300 characters' })
  comment: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString().trim())
  movieId: string;
}
