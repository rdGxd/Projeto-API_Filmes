import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controllers/movie.controller';
import { Movie } from './entities/movie.entity';
import { MovieMapper } from './mapper/movie-mapper';
import { MovieService } from './services/movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieMapper],
  imports: [TypeOrmModule.forFeature([Movie])],
  exports: [MovieService],
})
export class MovieModule {}
