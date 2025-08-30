import { ResponseFavoriteDto } from 'src/favorite/dto/response-favorite.dto';
import { ResponseReviewDto } from 'src/review/dto/response-review.dto';

export class ResponseUserDto {
  id: string;

  name: string;

  email: string;

  createdAt: string;

  updatedAt: string;

  favorites: ResponseFavoriteDto[];

  reviews: ResponseReviewDto[];
}
