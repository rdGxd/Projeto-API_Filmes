import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UserModule } from 'src/user/user.module';
import jwtConfig from '../common/config/jwt.config';
import { AuthController } from './controllers/auth.controller';
import { AuthAndPolicyGuard } from './guards/auth-and-policy.guard';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, AuthGuard, AuthAndPolicyGuard],
  imports: [
    UserModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    HashingModule,
  ],
  exports: [AuthService, JwtModule, AuthGuard, RolesGuard, AuthAndPolicyGuard],
})
export class AuthModule {}
