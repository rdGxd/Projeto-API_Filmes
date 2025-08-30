import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfiguration } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...AppConfiguration().pipes);
  await app.listen(process.env.APP_PORT ?? 3001);
}
void bootstrap();
