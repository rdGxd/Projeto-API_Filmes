import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';

import { AppConfiguration } from './common/config';
import { TypeOrmModuleConfig } from './common/config/type-orm.config';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ...AppConfiguration().imports,
    TypeOrmModuleConfig,
    UserModule,
    AuthModule,
    MovieModule,
    FavoriteModule,
    ReviewModule,
  ],
  providers: [...AppConfiguration().providers],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.debug(
      `O ambiente de execução é: ${process.env.NODE_ENV} e o arquivo é: env.${process.env.NODE_ENV}.local`,
    );
  }
}
