import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseMovieDto } from 'src/movie/dto/response-movie.dto';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoriteMapper {
  toEntity(user: User, movie: Movie): Favorite {
    return plainToInstance(Favorite, {
      userId: user.id,
      movieId: movie.id,
    });
  }

  toDto(entity: Favorite): ResponseMovieDto {
    return plainToInstance(ResponseMovieDto, {
      idFavorite: entity.id,
      userId: entity.user.id,
      movieId: entity.movie.id,
      movieTitle: entity.movie.title,
      movieDescription: entity.movie.description,
      movieRating: entity.movie.rating,
      movieGenre: entity.movie.genre,
      movieYearRelease: entity.movie.yearRelease.split('-')[0],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
