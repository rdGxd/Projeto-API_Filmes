import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const PipesConfig = [
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
