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
      id: entity.id,
      user: {
        id: entity.user.id,
        name: entity.user.name,
      },
      movie: {
        id: entity.movie.id,
        title: entity.movie.title,
        description: entity.movie.description,
        genre: entity.movie.genre,
        yearRelease: entity.movie.yearRelease,
        rating: entity.movie.rating,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
