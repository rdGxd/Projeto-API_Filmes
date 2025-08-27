import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseDtoUser } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  toEntity(dto: CreateUserDto): User {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  toResponse(user: User): ResponseDtoUser {
    const dto = new ResponseDtoUser();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
