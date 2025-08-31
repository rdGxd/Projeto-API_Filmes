import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppModuleConfiguration } from './common/config/module-config';
import { FavoriteModule } from './favorite/favorite.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ...AppModuleConfiguration().imports,
    UserModule,
    AuthModule,
    MovieModule,
    FavoriteModule,
    ReviewModule,
  ],
  providers: [...AppModuleConfiguration().providers],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.debug(
      `O ambiente de execução é: ${process.env.NODE_ENV} e o arquivo é: env.${process.env.NODE_ENV}.local`,
    );
  }
}
