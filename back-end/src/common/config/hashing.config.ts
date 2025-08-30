import { registerAs } from '@nestjs/config';

export default registerAs('hashing', () => ({
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
}));
