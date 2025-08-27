import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
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
  ],
  imports: [],
  exports: [AuthService, HashingProtocol],
})
export class AuthModule {}
