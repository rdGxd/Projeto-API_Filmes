import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Review } from 'src/review/entities/review.entity';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Review)
  reviews: Review[];
}
