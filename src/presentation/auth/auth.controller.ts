//nest
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
//presentation
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioDtoImpl } from '../usuario/dto/create-usuario.dto';
import { CreateProfesionalDto } from 'src/domain';
//packages
// import * as bcrypt from 'bcryptjs';
//express
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService
  ) {}

  //este endpoint me parece que no se está utilizando
  @Post('register')
  async register(@Body() createProfesionalDto: CreateProfesionalDto, @Res() res: Response) {
    //creamos usuario con el password hasheado
    const user = await this.usuarioService.createProfesional(createProfesionalDto);

    const { accessToken, refreshToken } = await this.authService.login({ id: user.id, email: user.correo });

    // set cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 min
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ id: user.id, email: user.correo, name: user.nombre_primero + ' ' + user.apellido_paterno});
  }

  @Post('login-profesional')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const validated = await this.authService.validateProfesionalByPassword(body.email, body.password);
    if (!validated) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    if (validated) console.log('validacion exitosa')

    const tokens = await this.authService.login({ id: (validated as any).id, email: body.email });

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 15*60*1000
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7*24*60*60*1000
    });

    return res.json({ id: (validated as any).id, email: body.email, tokens: tokens });
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // suponiendo que tienes un middleware que setea req.user con sub
    const userId = (req as any).user?.sub;
    if (userId) await this.authService.logout(userId);
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json({ ok: true });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    console.log("endpoint refresh activado")
    // lee refresh token desde cookie
    const rt = req.cookies?.refresh_token;
    console.log("refresh token: " + rt)
    if (!rt) {
      console.log("no refresh token :(")
      return res.status(401).json({ message: 'No refresh token' });
    }
    // decodifica el token para obtener sub
    try {
      console.log("iniciamos intento de refresh")
      const decoded: any = await this.authService['jwtService'].verify(rt, { secret: process.env.JWT_REFRESH_SECRET });
      console.log("decode: " + decoded)
      const userId = decoded.sub;
      console.log("userid: " + userId)
      const tokens = await this.authService.refresh(userId, rt);
      console.log("access token: " + tokens.accessToken)

      res.cookie('access_token', tokens.accessToken, {
        httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 15*60*1000
      });
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7*24*60*60*1000
      });
      return res.json({ ok: true });
    } catch (err) {
      console.log("catch el error, token invalido")
      return res.status(401).json({ message: 'Refresh token inválido' });
    }
  }

}
