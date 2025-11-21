import {
  ExceptionFilter, //1)interfaz que deben implementar los ExceptionFilters. Define el método catch(exception, host)
  Catch, //2)decorador que marca la clase como un FilterException
  ArgumentsHost, //3)interace. Tiene métodos que permiten acceder al context (http, rcp, websocket) (creo)
  //4)helpers de nest que representan respuestas de http con estado y cuerpo estandar. Se usa para construir respuestas HTTP consistentes
  HttpException, //
  BadRequestException, //400
  UnauthorizedException, //401
  ForbiddenException, //403
  NotFoundException, //404
  ConflictException, //409
  InternalServerErrorException, //500
} from '@nestjs/common';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 1 - Aquí solo se gestionan los errores de Prisma; los demás se redirigen para su gestión en otro lugar.
    if (!exception || typeof exception.code !== 'string') {
      throw exception;
    }

    //2.1 - generamos el response que vamos a devolver después (2.2)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    //3 - definimos el httpException (400, 401, etc) en base al code del exception para devolverlo en el response
    let httpException: HttpException;

    switch (exception.code) {
      case 'P2025':
        httpException = new NotFoundException(
          'El recurso solicitado no existe',
        );
        break;

      case 'P2002':
        httpException = new ConflictException(
          'Violación de restricción única',
        );
        break;

      case 'P2003':
        httpException = new BadRequestException(
          'Violación de clave foránea',
        );
        break;

      default:
        httpException = new InternalServerErrorException(
          'Error interno de base de datos',
        );
    }

    //2.2 - devolvemos el response con la info del httpException
    response.status(httpException.getStatus()).json({
      statusCode: httpException.getStatus(),
      message: httpException.message,
      code: exception.code,
    });
  }
}
