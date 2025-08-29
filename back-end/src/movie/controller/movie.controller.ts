import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/set-is-public-policy.decorator';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieService } from '../service/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }

  @Get('genre/:genre')
  @Public()
  filterGenre(@Param('genre') genre: string) {
    return this.movieService.filterGenre(genre);
  }

  @Get('year/:year')
  @Public()
  filterYear(@Param('year') year: string) {
    return this.movieService.filterYear(year);
  }

  @Get('rating/:rating')
  @Public()
  filterRating(@Param('rating') rating: string) {
    return this.movieService.filterRating(rating);
  }
}
