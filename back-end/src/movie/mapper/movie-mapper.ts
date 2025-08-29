import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { ResponseMovieDto } from '../dto/response-movie.dto';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieMapper {
  toEntity(dto: CreateMovieDto): Movie {
    return plainToInstance(Movie, dto);
  }

  toResponse(movie: Movie): ResponseMovieDto {
    return plainToInstance(ResponseMovieDto, movie);
  }
}
