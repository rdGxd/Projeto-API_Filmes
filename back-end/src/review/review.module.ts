import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { ReviewController } from './controllers/review.controller';
import { Review } from './entities/review.entity';
import { ReviewMapper } from './mapper/review-mapper';
import { ReviewService } from './services/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), MovieModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewMapper],
})
export class ReviewModule {}
