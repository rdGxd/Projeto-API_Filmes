import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { HashingProtocol } from './hashing-protocol';

@Module({
  providers: [
    {
      provide: HashingProtocol,
      useClass: BcryptService,
    },
  ],
  exports: [HashingProtocol],
})
export class HashingModule {}
