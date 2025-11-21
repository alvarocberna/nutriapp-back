import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    // Detecta si es un error de Prisma (normalmente tiene 'code' string)
    if (!exception || typeof exception.code !== 'string') {
      // no es Prisma => rethrow para que otros filtros/handler lo procesen
      throw exception;
    }

    this.logger.debug({ prismaCode: exception.code, meta: exception });

    let httpException: HttpException;

    switch (exception.code) {
      case 'P2025': // e.g. record not found for an operation
        httpException = new NotFoundException('El recurso solicitado no existe');
        break;

      case 'P2002': // unique constraint failed
        // puedes incluir qué campo produjo la violación en el message o en logs
        httpException = new ConflictException('Violación de restricción única');
        break;

      case 'P2003': // foreign key violation
        httpException = new BadRequestException('Violación de clave foránea');
        break;

      default:
        httpException = new InternalServerErrorException('Error interno de base de datos');
    }

    // En vez de enviar la respuesta aquí, lanzamos la HttpException
    // para que el HttpExceptionFilter la formatee y registre de forma centralizada.
    throw httpException;
  }
}
