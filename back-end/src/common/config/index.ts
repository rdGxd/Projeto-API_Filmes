import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModuleGlobal } from './module-config';
import { PipesConfig } from './pipes.config';
import { ProviderConfig } from './provider.config';

export const AppConfiguration = () => ({
  imports: [
    ConfigModuleGlobal,
    CacheModule.register({ isGlobal: true, ttl: 5000 }),
  ],
  providers: [...ProviderConfig()],
  pipes: [...PipesConfig],
});
