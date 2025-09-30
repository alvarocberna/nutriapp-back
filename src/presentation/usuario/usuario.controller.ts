import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
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

  @Get(':rol')
  async getUsuarioByRol(@Param('rol') rol: Rol) {
    return this.usuarioService.getUsuarioByRol(rol);
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: string) {
    return this.usuarioService.getUsuarioById(id);
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)  
  async createUsuario(@Body() data: CreateUsuarioDto) {
    
    return this.usuarioService.createPaciente(data);

  }
  
}
