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
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(10, { message: 'Rating must be at most 10' })
  rating: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 300, { message: 'Comment must be between 10 and 300 characters' })
  comment: string;

  @IsString()
  @IsNotEmpty()
  movieId: string;
}
