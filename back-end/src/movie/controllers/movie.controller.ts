import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/set-is-public-policy.decorator';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { FilterMovieDto } from '../dto/filter-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieService } from '../services/movie.service';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor) // Aplica serialização automática
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      return await this.movieService.create(createMovieDto);
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      throw error;
    }
  }

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get('search')
  @Public()
  @HttpCode(HttpStatus.OK)
  async search(@Query() filterDto: FilterMovieDto) {
    // Parâmetros de query já validados e sanitizados
    console.log('Filtros aplicados:', {
      genre: filterDto.genre, // Undefined ou string sanitizada
      year: filterDto.year, // Undefined ou ano válido
      search: filterDto.search, // Undefined ou busca sanitizada
      page: filterDto.page, // Number >= 1
      limit: filterDto.limit, // Number entre 1-100
    });

    return await this.movieService.filterMovies(filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.movieService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.update(id, updateMovieDto);
  }
}
