import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetRoutePolicy } from 'src/auth/decorators/set-route-policy.decorator';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { Roles } from 'src/auth/enums/roles.enums';
import { HashingProtocol } from 'src/auth/hashing/hashing-protocol';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mapper/user-mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly bcryptService: HashingProtocol,
    private readonly userMapper: UserMapper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userMapper.toEntity(createUserDto);
    user.password = await this.bcryptService.hash(user.password);
    await this.userRepository.save(user);
    return this.userMapper.toResponse(user);
  }

  @SetRoutePolicy(Roles.Admin)
  async findAll() {
    const allUsers = await this.userRepository.find();
    return allUsers.map((user) => this.userMapper.toResponse(user));
  }

  @SetRoutePolicy(Roles.Admin, Roles.User)
  async findOne(id: string, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.id !== payload.sub) {
      throw new Error('Unauthorized');
    }
    return this.userMapper.toResponse(user);
  }

  @SetRoutePolicy(Roles.Admin, Roles.User)
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayload: PayloadDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.id !== tokenPayload.sub) {
      throw new Error('Unauthorized');
    }

    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return this.userMapper.toResponse(user);
  }

  @SetRoutePolicy(Roles.Admin, Roles.User)
  async remove(id: string, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.id !== payload.sub) {
      throw new Error('Unauthorized');
    }

    return await this.userRepository.remove(user);
  }
}
