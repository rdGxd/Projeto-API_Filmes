import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as csurf from 'csurf';
import helmet from 'helmet';

export const MainConfig = async (app: INestApplication) => {
  app.useGlobalPipes(...PipesConfig);

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors({
      origin: ['https://meuapp.com.br', 'http://localhost:3000'],
    });
    app.use(csurf.default());
  }

  await app.listen(process.env.APP_PORT ?? 3001);
};

const PipesConfig = [
  new ValidationPipe({
    // Sanitização automática
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Rejeita se tiver propriedades extras
    transform: true, // Aplica transformações do class-transformer

    // Configurações de transformação
    transformOptions: {
      enableImplicitConversion: true, // Conversão automática de tipos
    },

    // Mensagens de erro personalizadas
    exceptionFactory: (errors) => {
      const messages = errors.map((error) => ({
        field: error.property,
        value: error.value,
        errors: Object.values(error.constraints || {}),
        children:
          error.children && error.children.length > 0
            ? error.children
            : undefined,
      }));

      return new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
        details: messages,
      });
    },
  }),
];
