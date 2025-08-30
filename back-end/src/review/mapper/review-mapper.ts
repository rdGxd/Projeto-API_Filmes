import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Movie } from 'src/movie/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ResponseReviewDto } from '../dto/response-review.dto';
import { Review } from '../entities/review.entity'

@Injectable()
export class ReviewMapper {
  toDto(entity: Review, movie: Movie, user: User): ResponseReviewDto {
    return plainToInstance(ResponseReviewDto, {
      id: entity.id,
      rating: entity.rating,
      comment: entity.comment,
      movie: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        genre: movie.genre,
        yearRelease: movie.yearRelease,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(dto: CreateReviewDto): Review {
    return plainToInstance(Review, {
      rating: dto.rating,
      comment: dto.comment,
      movie: {
        id: dto.movieId,
      },
      user: {
        id: dto.userId,
      },
    });
  }
}
