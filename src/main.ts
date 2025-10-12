import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3001', // tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // ignora propiedades que no están en el DTO
      forbidNonWhitelisted: true, 
      transform: true,        // 👈 transforma tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true, // 👈 convierte strings a number/date si el tipo del DTO lo pide
        },
      }),
    );
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
