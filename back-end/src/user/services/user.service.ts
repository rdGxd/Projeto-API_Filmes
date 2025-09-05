import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mapper/user-mapper';

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
    const saved = await this.userRepository.save(user);
    return this.userMapper.toResponse(saved);
  }

  async findAll() {
    const allUsers = await this.userRepository.find({
      relations: ['favorites', 'reviews'],
    });
    return allUsers.map((user) => this.userMapper.toResponse(user));
  }

  async findOne(payload: PayloadDto) {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['favorites', 'reviews'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userMapper.toResponse(user);
  }

  async update(updateUserDto: UpdateUserDto, tokenPayload: PayloadDto) {
    const user = await this.userRepository.findOne({
      where: { id: tokenPayload.sub },
      relations: ['favorites', 'reviews'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);

    // Recarregar com relacionamentos para retornar
    const updatedUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['favorites', 'reviews'],
    });

    return this.userMapper.toResponse(updatedUser!);
  }

  async remove(id: string, payload: PayloadDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id !== payload.sub) {
      throw new UnauthorizedException('Unauthorized');
    }

    return await this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
