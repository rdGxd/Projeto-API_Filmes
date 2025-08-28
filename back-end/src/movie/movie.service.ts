import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieMapper } from './mapper/movie-mapper';

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
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new Error('Movie not found');
    return this.movieMapper.toResponse(movie);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new Error('Movie not found');
    this.movieRepository.merge(movie, updateMovieDto);
    await this.movieRepository.save(movie);
    return this.movieMapper.toResponse(movie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) throw new Error('Movie not found');
    await this.movieRepository.remove(movie);
    return this.movieMapper.toResponse(movie);
  }

  async filterGenre(genre: string) {
    const movies = await this.movieRepository.find({ where: { genre } });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterYear(year: string) {
    const movies = await this.movieRepository.find({
      where: { yearRelease: year },
    });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }

  async filterRating(rating: string) {
    const movies = await this.movieRepository.find({ where: { rating } });
    return movies.map((movie) => this.movieMapper.toResponse(movie));
  }
}
