import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseFavoriteDto } from 'src/favorite/dto/response-favorite.dto';
import { ResponseReviewDto } from 'src/review/dto/response-review.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  toEntity(dto: CreateUserDto): User {
    return plainToInstance(User, dto);
  }

  toResponse(user: User): ResponseUserDto {
    return plainToInstance(ResponseUserDto, {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      favorites: (user.favorites || []).map((favorite) =>
        plainToInstance(ResponseFavoriteDto, favorite),
      ),
      reviews: (user.reviews || []).map((review) =>
        plainToInstance(ResponseReviewDto, review),
      ),
    });
  }
}
