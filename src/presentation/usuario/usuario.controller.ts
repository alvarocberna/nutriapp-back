//nest
import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, UseGuards  } from '@nestjs/common';
//express
import { Request } from 'express';
//presentation
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
//domain
import { UsuarioEntity } from 'src/domain/entities/usuario.entity';
//prisma
import { Rol } from 'generated/prisma';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  
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

  @Post()
  // @HttpCode(HttpStatus.CREATED)  
  async createUsuario(@Body() data: CreateUsuarioDto) {
    
    return this.usuarioService.createPaciente(data);

  }
  
}
