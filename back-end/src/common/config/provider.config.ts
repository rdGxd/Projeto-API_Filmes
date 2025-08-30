import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { AuthAndPolicyGuard } from '../../auth/guards/auth-and-policy.guard';

export const ProviderConfig = () => {
  const AuthGuard = {
    provide: APP_GUARD,
    useClass: AuthAndPolicyGuard,
  };

  const CacheProvider = {
    provide: 'CACHE_MANAGER',
    useClass: CacheModule,
  };

  return [AuthGuard, CacheProvider];
};
