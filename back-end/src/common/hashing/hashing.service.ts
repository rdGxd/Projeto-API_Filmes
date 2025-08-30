import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import hashingConfig from '../config/hashing.config';
import { HashingProtocol } from './hashing-protocol';

@Injectable()
export class SecureHashingService implements HashingProtocol {
  constructor(
    @Inject(hashingConfig.KEY)
    private readonly hashingConfiguration: ConfigType<typeof hashingConfig>,
  ) {}

  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.hashingConfiguration.saltRounds);
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
