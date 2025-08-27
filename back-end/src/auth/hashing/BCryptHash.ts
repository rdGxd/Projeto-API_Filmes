import * as bcrypt from 'bcrypt';
import { HashingProtocol } from './hashing-protocol';

export class BcryptService implements HashingProtocol {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed);
  }
}
