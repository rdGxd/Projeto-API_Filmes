import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { ResponseFavoriteDto } from '../dto/response-favorite.dto';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoriteMapper {
  toEntity(user: User, movie: Movie): Favorite {
    return plainToInstance(Favorite, {
      user,
      movie,
    });
  }

  toDto(entity: Favorite): ResponseFavoriteDto {
    return plainToInstance(ResponseFavoriteDto, {
      idFavorite: entity.id,
      user: {
        userId: entity.user.id,
        userName: entity.user.name,
      },
      movie: {
        movieId: entity.movie.id,
        movieTitle: entity.movie.title,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
