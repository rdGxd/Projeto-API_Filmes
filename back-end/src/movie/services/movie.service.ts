import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { FilterMovieDto } from '../dto/filter-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieMapper } from '../mapper/movie-mapper';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieMapper: MovieMapper,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.movieMapper.toEntity(createMovieDto);
    await this.movieRepository.save(movie);
    return this.movieMapper.toResponse(movie);
  }

  async findAll() {
    const movies = await this.movieRepository.find({
      relations: ['reviews', 'reviews.user'],
    });

    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews', 'reviews.user'],
    });

    if (!movie) throw new NotFoundException('Movie not found');

    return this.movieMapper.toResponse(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) throw new NotFoundException('Movie not found');
    this.movieRepository.merge(movie, {
      title: updateMovieDto.title,
      genre: updateMovieDto.genre,
      description: updateMovieDto.description,
      coverImage: updateMovieDto.coverImage,
      rating: updateMovieDto.rating,
      yearRelease: updateMovieDto.yearRelease,
      reviews: updateMovieDto.reviews,
    });
    await this.movieRepository.save(movie);
    return this.movieMapper.toResponse(movie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');
    await this.movieRepository.remove(movie);
    return this.movieMapper.toResponse(movie);
  }

  async filterGenre() {
    const movies = await this.movieRepository.find({
      order: { genre: 'DESC' },
      relations: ['reviews', 'reviews.user'],
    });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterYear() {
    const movies = await this.movieRepository.find({
      order: { yearRelease: 'DESC' },
      relations: ['reviews', 'reviews.user'],
    });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterRating() {
    const movies = await this.movieRepository.find({
      order: { rating: 'DESC' },
      relations: ['reviews', 'reviews.user'],
    });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async findById(id: string) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async filterMovies(filterDto: FilterMovieDto) {
    const query = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.reviews', 'review')
      .leftJoinAndSelect('review.user', 'user');

    if (filterDto.genre) {
      query.andWhere('movie.genre = :genre', { genre: filterDto.genre });
    }

    if (filterDto.year) {
      query.andWhere('movie.yearRelease = :year', { year: filterDto.year });
    }
    if (filterDto.rating) {
      query.andWhere('movie.rating = :rating', { rating: filterDto.rating });
    }

    const movies = await query.getMany();
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }
}
