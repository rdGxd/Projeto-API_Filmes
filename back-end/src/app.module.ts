import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModuleConfig } from './global/typer-orm.config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TypeOrmModuleConfig,
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
