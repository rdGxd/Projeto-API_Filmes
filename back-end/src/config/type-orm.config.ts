import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

enum DatabaseType {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const TypeOrmModuleConfig = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => createTypeOrmConfig(config),
});

const createTypeOrmConfig = (config: ConfigService) => {
  const env = config.get<string>('NODE_ENV') as DatabaseType;
  switch (env) {
    case DatabaseType.DEVELOPMENT:
      return development(config);
    case DatabaseType.PRODUCTION:
      return production(config);
    case DatabaseType.TEST:
      return test(config);
    default:
      throw new Error(`Unsupported database type: ${env}`);
  }
};

const baseConfig = (config: ConfigService) => ({
  host: config.get<string>('DATABASE_HOST'),
  port: Number(config.get<string>('DATABASE_PORT')),
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_DATABASE'),
  synchronize: config.get<string>('DATABASE_SYNCHRONIZE') === 'true',
  autoLoadEntities:
    config.get<string>('DATABASE_AUTO_LOAD_ENTITIES') === 'true',
});

const development = (config: ConfigService) => ({
  type: 'postgres' as const,
  ...baseConfig(config),
});

const production = (config: ConfigService) => ({
  type: 'mysql' as const,
  ...baseConfig(config),
});

const test = (config: ConfigService) => ({
  type: 'sqlite' as const,
  ...baseConfig(config),
});
