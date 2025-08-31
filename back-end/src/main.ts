import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MainConfig } from './common/config/main-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  MainConfig(app);
}
void bootstrap();
