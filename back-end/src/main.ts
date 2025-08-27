import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PipesConfig } from './global/pipes.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...PipesConfig);
  await app.listen(process.env.APP_PORT ?? 3001);
}
void bootstrap();
