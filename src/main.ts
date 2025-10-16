import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser')
import { ConfigService } from '@nestjs/config';


async function bootstrap() {

  //creamos el server
  const app = await NestFactory.create(AppModule);
  //habilitamos el parseo de cookis para recibir cookies del front
  app.use(cookieParser());
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3001', // tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

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
  
  // await app.listen(process.env.PORT ?? 3000);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port ?? 3000)
}
bootstrap();
