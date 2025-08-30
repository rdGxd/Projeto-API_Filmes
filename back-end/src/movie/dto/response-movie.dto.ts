import { ResponseReviewDto } from 'src/review/dto/response-review.dto';

export class ResponseMovieDto {
  id: string;
  title: string;
  description: string;
  rating: number;
  genre: string;
  yearRelease: number;
  createdAt: Date;
  updatedAt: Date;

  reviews: ResponseReviewDto[];
}
