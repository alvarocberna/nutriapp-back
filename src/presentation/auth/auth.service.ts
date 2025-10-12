//nest
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//presentation
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuarioService } from '../usuario/usuario.service';
//paquetes
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
      private usuarioService: UsuarioService,
      private jwtService: JwtService,
      private configService: ConfigService,
  ){}

  async validateUserByPassword(email: string, pass: string) {
    const user = await this.usuarioService.getUsuarioByEmail(email);
    if (!user) return null;
    const matches = await bcrypt.compare(pass, user.password);
    if (!matches) return null;
    // omit password when returning
    const { password, hashedRt, ...rest } = user;
    return rest;
  }

  async login(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    // hash refresh token and store in DB
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_OR_ROUNDS');
    const hashedRt = await bcrypt.hash(refreshToken, +saltRounds!);
    await this.usuarioService.setRefreshToken(user.id, hashedRt);
    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.usuarioService.removeRefreshToken(userId);
  }

  async refresh(userId: string, rt: string) {
    const user = await this.usuarioService.getUsuarioById(userId);
    if (!user || !user.hashedRt) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(rt, user.hashedRt);
    if (!isMatch) throw new UnauthorizedException();
    // create new tokens
    const payload = { sub: user.id, email: user.correo };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    const saltRounds = this.configService.get<number>('BCRYPT_SALT_OR_ROUNDS');
    const newHashedRt = await bcrypt.hash(refreshToken, +saltRounds!);
    await this.usuarioService.setRefreshToken(user.id, newHashedRt);
    return { accessToken, refreshToken };
  }

}
