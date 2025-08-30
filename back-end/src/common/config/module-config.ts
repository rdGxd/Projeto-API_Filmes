import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

export const ConfigModuleGlobal = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [
    join(__dirname, `../../../../.env.${process.env.NODE_ENV}.local`),
  ],
  cache: true,
  expandVariables: true,
});
