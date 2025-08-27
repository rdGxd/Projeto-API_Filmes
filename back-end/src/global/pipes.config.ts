import { ValidationPipe } from '@nestjs/common';

export const PipesConfig = [
  new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: false,
  }),
];
