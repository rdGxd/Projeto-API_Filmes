import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import hashingConfig from '../config/hashing.config';
import { SecureHashingService } from './hashing.service';
import { HashingProtocol } from './hashing-protocol';

@Module({
  imports: [ConfigModule.forFeature(hashingConfig)],
  providers: [
    {
      provide: HashingProtocol,
      useClass: SecureHashingService,
    },
  ],
  exports: [HashingProtocol],
})
export class HashingModule {}
