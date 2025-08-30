import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/set-is-public-policy.decorator';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { FilterMovieDto } from '../dto/filter-movie.dto';
import { MovieService } from '../services/movie.service';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor) // Aplica serialização automática
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    // Os dados já chegam validados e sanitizados aqui!
    console.log('Dados recebidos:', {
      title: createMovieDto.title, // String sanitizada
      genre: createMovieDto.genre, // Lowercase normalizado
      rating: createMovieDto.rating, // Number com 1 casa decimal
      year: createMovieDto.yearRelease, // String validada como ano
    });

    return this.movieService.create(createMovieDto);
  }

  @Get('search')
  @Public()
  async search(@Query() filterDto: FilterMovieDto) {
    // Parâmetros de query já validados e sanitizados
    console.log('Filtros aplicados:', {
      genre: filterDto.genre, // Undefined ou string sanitizada
      year: filterDto.year, // Undefined ou ano válido
      search: filterDto.search, // Undefined ou busca sanitizada
      page: filterDto.page, // Number >= 1
      limit: filterDto.limit, // Number entre 1-100
    });

    return this.movieService.filterMovies(filterDto);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    // ParseUUIDPipe valida que o ID é um UUID válido
    return this.movieService.findOne(id);
  }
}
