import { ResponseMovieDto } from 'src/movie/dto/response-movie.dto';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';

export class ResponseReviewDto {
  id: string;

  rating: number;

  comment: string;

  createdAt: Date;

  updatedAt: Date;

  movie: ResponseMovieDto;

  user: ResponseUserDto;
}
