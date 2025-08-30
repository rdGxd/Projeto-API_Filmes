import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseReviewDto } from 'src/review/dto/response-review.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { ResponseMovieDto } from '../dto/response-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieMapper {
  toEntity(dto: CreateMovieDto): Movie {
    return plainToInstance(Movie, dto);
  }

  toResponse(movie: Movie): ResponseMovieDto {
    return plainToInstance(ResponseMovieDto, {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      yearRelease: movie.yearRelease,
      genre: movie.genre,
      rating: movie.rating,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
      reviews: (movie.reviews || []).map((review) =>
        plainToInstance(ResponseReviewDto, review),
      ),
    });
  }
}
