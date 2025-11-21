//nest
import { Controller, Get, Param, Body, Post, HttpCode, HttpStatus, Query, UseGuards, Req, Res  } from '@nestjs/common';
//presentation
import { UsuarioService } from './usuario.service';
import { CreatePacienteDtoImpl } from './dto/create-paciente.dto';
import { CreateProfesionalDtoImpl } from './dto/create-profesional.dto';;
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
  async getPacientesByProfId(
    @Req() req: Request,
    @Res() res: Response,
    @Query('search') search?: string,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Query('edadMin') edadMin?: string,
    @Query('edadMax') edadMax?: string,
  ){
    console.log('edad min: ' + edadMin)
    console.log('edad max: ' + edadMax)
    const edadMinima = Number(edadMin)
    const edadMaxima = Number(edadMax)
    const id_prof = (req as any).user?.id; //sub o  id????
    // const id_prof = "454235ef-c3af-4fda-80cb-59ecb83523d5";
    const pacientes = await this.usuarioService.getPacientesByProfId(id_prof, {search, fechaInicio, fechaFin, edadMinima, edadMaxima});
    return res.json(pacientes);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-paciente')
  // @HttpCode(HttpStatus.CREATED)  
  async createPaciente(@Body() createPacienteDtoImpl: CreatePacienteDtoImpl, @Req() req: Request) {
    const id_prof = (req as any).user?.id;
    return this.usuarioService.createPaciente(id_prof, createPacienteDtoImpl);
  }

  //PROFESIONALES
  @Post('create-profesional')
  // @HttpCode(HttpStatus.CREATED)  
  async createProfesional(@Body() createProfesionalDtoImpl: CreateProfesionalDtoImpl, @Req() req: Request) {
    return this.usuarioService.createProfesional(createProfesionalDtoImpl);
  }
  
}
