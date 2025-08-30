import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { FavoriteController } from './controllers/favorite.controller';
import { Favorite } from './entities/favorite.entity';
import { FavoriteMapper } from './mapper/favorite-mapper';
import { FavoriteService } from './services/favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteMapper],
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    AuthModule,
    UserModule,
    MovieModule,
  ],
})
export class FavoriteModule {}
