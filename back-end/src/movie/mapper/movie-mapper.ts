import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseReviewDto } from 'src/review/dto/response-review.dto';
import { ReviewMapper } from 'src/review/mapper/review-mapper';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { ResponseMovieDto } from '../dto/response-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieMapper {
  toEntity(dto: CreateMovieDto): Movie {
    return plainToInstance(Movie, dto);
  }

  toResponse(movie: Movie): ResponseMovieDto {
    console.log('Movie reviews:', movie.reviews?.length || 0);
    console.log(
      'Reviews details:',
      movie.reviews?.map((r) => ({
        id: r.id,
        comment: r.comment.substring(0, 20),
      })),
    );

    const reviews: ResponseReviewDto[] = [];

    if (movie.reviews && movie.reviews.length > 0) {
      movie.reviews.forEach((rev) => {
        reviews.push(new ReviewMapper().toDto(rev, movie, rev.user));
      });
    }

    const response = new ResponseMovieDto();

    response.id = movie.id;
    response.title = movie.title;
    response.description = movie.description;
    response.yearRelease = movie.yearRelease;
    response.genre = movie.genre;
    response.rating = movie.rating;
    response.createdAt = movie.createdAt;
    response.updatedAt = movie.updatedAt;
    response.coverImage = movie.coverImage;
    response.reviews = reviews;

    return response;
  }
}
