import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { BcryptService } from './hashing/BCryptHash';
import { HashingProtocol } from './hashing/hashing-protocol';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProtocol,
      useClass: BcryptService,
    },
    RolesGuard,
    AuthGuard,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProtocol, JwtModule, AuthGuard, RolesGuard],
})
export class AuthModule {}
