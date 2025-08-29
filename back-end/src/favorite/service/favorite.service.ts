import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { MovieService } from 'src/movie/service/movie.service';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../dto/update-favorite.dto';
import { Favorite } from '../entities/favorite.entity';
import { FavoriteMapper } from '../mapper/favorite-mapper';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly userService: UserService,
    private readonly movieService: MovieService,
    private readonly favoriteMapper: FavoriteMapper,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, payload: PayloadDto) {
    const movie = await this.movieService.findById(createFavoriteDto.movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const user = await this.userService.findById(payload.sub);
    if (!user || createFavoriteDto.userId !== payload.sub) {
      throw new Error('User not found');
    }
    const favorite = this.favoriteMapper.toEntity(user, movie);
    user.favorites = [...(user.favorites || []), favorite];
    await this.favoriteRepository.save(favorite);
    await this.userService.update(user.id, { ...user }, payload);
    return this.favoriteMapper.toDto(favorite);
  }

  findAll() {
    return this.favoriteRepository.find();
  }

  findOne(id: string, payload: PayloadDto) {
    return this.favoriteRepository.findOne({});
  }

  update(
    id: string,
    updateFavoriteDto: UpdateFavoriteDto,
    payload: PayloadDto,
  ) {}

  remove(id: string, payload: PayloadDto) {}
}
