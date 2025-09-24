import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3001', // tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true, // Habilita la transformación de tipos
  //     whitelist: true, // Opcional: elimina propiedades no definidas en el DTO
  //     forbidNonWhitelisted: true, // Opcional: lanza error si hay propiedades no permitidas
  //   }),
  // );
  // ESTO CAUSA ERROR - Habilitar pipes
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,   // elimina campos no definidos en DTO
  //     forbidNonWhitelisted: true, // lanza error si envías campos extra
  //     transform: true,   // 👈 convierte los tipos según el DTO
  //     transformOptions: {
  //       enableImplicitConversion: true, // 👈 convierte string -> number automáticamente
  //     },
  //   }),
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
