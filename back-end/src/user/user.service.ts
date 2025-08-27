import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAll() {
    const allUsers = await this.userRepository.find();
    return allUsers.map((user) => this.userMapper.toResponse(user));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userMapper.toResponse(user);
  }

  // TODO: verificar se realmente eu quero que o usuário seja atualizado por completo sem verificar o que vem no DTO
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return this.userMapper.toResponse(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepository.remove(user);
  }
}
