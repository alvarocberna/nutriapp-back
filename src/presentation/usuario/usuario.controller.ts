//nest
import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, UseGuards, Req, Res  } from '@nestjs/common';
//express
// import { Request } from 'express';
//presentation
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
// import { AuthService } from '../auth/auth.service';
//domain
import { UsuarioEntity } from 'src/domain/entities/usuario.entity';
//prisma
import { Rol } from 'generated/prisma';
//express
import type { Response, Request } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService
    // private readonly authService: AuthService
  ) {}

  
  @Get()
  async getUsuarios() {
    return this.usuarioService.getUsuarios();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('id/:id')
  async getUsuarioById(@Param('id') id: string) {
    return this.usuarioService.getUsuarioById(id);
  }

  @Get('rol/:rol')
  async getUsuarioByRol(@Param('rol') rol: Rol) {
    return this.usuarioService.getUsuarioByRol(rol);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pacientes-by-profesional-id')
  async getPacientesByProfId(@Req() req: Request, @Res() res: Response){
    const userId = (req as any).user?.sub;
    const pacientes = await this.usuarioService.getPacientesByProfId(userId);
    return res.json(pacientes);
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)  
  async createPaciente(@Body() data: CreateUsuarioDto) {
    
    return this.usuarioService.createPaciente(data);

  }
  
}
