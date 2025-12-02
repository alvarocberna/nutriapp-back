import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser')
import { ConfigService } from '@nestjs/config';
import {HttpExceptionFilter} from './presentation/filters/http-exception.filter';


async function bootstrap() {
  //creamos el server
  const app = await NestFactory.create(AppModule);
  //para llamar env var
  const configService = app.get(ConfigService);
  //habilitamos el parseo de cookis para recibir cookies del front
  app.use(cookieParser());
  // Habilitar CORS
  app.enableCors({
    origin: configService.get<string>('URL_FRONTEND'), 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  //habilitamos Prisma Filter personalizado para manejar exceptions de Prisma
  app.useGlobalFilters(new HttpExceptionFilter());
  //habilitamos los pipes de nest para convertir tipos de datos en el DTO
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

  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000)
}
bootstrap();
