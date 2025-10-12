//nest
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/*
    Middleware o interceptor.
    Al ser utilizado en una ruta, y solicitarse esa ruta, se activa este
    guard, que activa la estrategia de autenticación de JwtStrategy llamada
    'jwt' (llamada así por defecto por passport)
*/

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}