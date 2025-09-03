import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { FilterMovieDto } from '../dto/filter-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';
import { genreEnum } from '../enums/genreEnum';
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
    const movies = await this.movieRepository.find();
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews'],
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

  async filterGenre(genre: genreEnum) {
    const movies = await this.movieRepository.find({ where: { genre } });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterYear(year: number) {
    const movies = await this.movieRepository.find({
      where: { yearRelease: year },
    });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterRating(rating: number) {
    const movies = await this.movieRepository.find({ where: { rating } });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async findById(id: string) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async filterMovies(filterDto: FilterMovieDto) {
    const query = this.movieRepository.createQueryBuilder('movie');

    if (filterDto.genre) {
      query.andWhere('movie.genre = :genre', { genre: filterDto.genre });
    }
    if (filterDto.year) {
      query.andWhere('movie.yearRelease = :year', { year: filterDto.year });
    }
    if (filterDto.minRating) {
      query.andWhere('movie.rating >= :minRating', {
        minRating: filterDto.minRating,
      });
    }

    const movies = await query.getMany();
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }
}
