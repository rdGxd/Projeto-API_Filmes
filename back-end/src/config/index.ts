import { ConfigModuleGlobal } from './module-config';
import { PipesConfig } from './pipes.config';
import { GlobalProvider } from './provider.config';

export const AppConfiguration = () => ({
  imports: [ConfigModuleGlobal],
  providers: [...GlobalProvider()],
  pipes: [...PipesConfig],
});
