import { ConfigModule } from '@nestjs/config';

export const ConfigModuleGlobal = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [`.env.${process.env.NODE_ENV}.local`],
  cache: true,
  expandVariables: true,
});
