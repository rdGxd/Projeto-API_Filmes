import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { AuthAndPolicyGuard } from 'src/auth/guards/auth-and-policy.guard';
import { TypeOrmModuleConfig } from './type-orm.config';

export const AppModuleConfiguration = () => ({
  imports: [
    ConfigModuleGlobal,
    CacheModule.register({ isGlobal: true, ttl: 5000 }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 10,
        blockDuration: 5000,
      },
    ]),
    TypeOrmModuleConfig,
  ],
  providers: [...ProviderConfig()],
});

const ConfigModuleGlobal = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: [
    join(__dirname, `../../../../.env.${process.env.NODE_ENV}.local`),
  ],
  cache: true,
  expandVariables: true,
});

const ProviderConfig = () => {
  const AuthGuard = {
    provide: APP_GUARD,
    useClass: AuthAndPolicyGuard,
  };

  const CacheProvider = {
    provide: 'CACHE_MANAGER',
    useClass: CacheModule,
  };

  const Throttler_Guard = {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  };

  return [AuthGuard, CacheProvider, Throttler_Guard];
};
