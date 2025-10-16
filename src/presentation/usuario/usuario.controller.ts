//nest
import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, UseGuards, Req, Res  } from '@nestjs/common';
//presentation
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDtoImpl } from './dto/create-usuario.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
//prisma
import { Rol } from 'generated/prisma';
//express
import type { Response, Request } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService
  ) {}

  //USUARIOS (3)
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

  //PACIENTES (2)
  @UseGuards(JwtAuthGuard)
  @Get('pacientes-by-profesional-id')
  async getPacientesByProfId(@Req() req: Request, @Res() res: Response){
    const prof_id = (req as any).user?.id; //sub o  id????
    // const userId = "454235ef-c3af-4fda-80cb-59ecb83523d5";
    const pacientes = await this.usuarioService.getPacientesByProfId(prof_id);
    return res.json(pacientes);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  // @HttpCode(HttpStatus.CREATED)  
  async createPaciente(@Body() data: CreateUsuarioDtoImpl, @Req() req: Request) {
    const id_prof = (req as any).user?.id;
    return this.usuarioService.createPaciente(id_prof, data);
  }
  
}
