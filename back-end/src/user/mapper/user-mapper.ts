import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseDtoUser } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  toEntity(dto: CreateUserDto): User {
    return plainToInstance(User, dto);
  }

  toResponse(user: User): ResponseDtoUser {
    return plainToInstance(ResponseDtoUser, user, {
      excludeExtraneousValues: true,
    });
  }
}
