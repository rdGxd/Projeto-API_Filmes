import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieMapper } from './mapper/movie-mapper';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieMapper],
  imports: [TypeOrmModule.forFeature([Movie])],
  exports: [MovieService],
})
export class MovieModule {}
