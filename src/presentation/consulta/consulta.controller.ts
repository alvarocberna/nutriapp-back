//nest
import { Controller, Get, Post, Put, Body, Req, UseGuards, Param, Delete } from '@nestjs/common';
//express
import type {Request} from 'express'
//presentation
import { ConsultaService } from './consulta.service';
import { CreateConsultaAllDtoImpl } from './dto/create-consulta.dto';
import { UpdateConsultaAllDtoImpl } from 'src/presentation';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('by-id-paciente/:id_paciente')
  async getConsultaByIdPaciente(
      @Req() req: Request,
      @Param('id_paciente') id_paciente: string,
  ) {
      const id_profesional = (req as any).user?.id;
      return this.consultaService.getConsultasAndNestedEntities(id_profesional, id_paciente);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('by-id-paciente-and-id-consulta/:id_paciente/:id_consulta')
  async getConsultasByIdPacienteAndIdConsulta(
      @Req() req: Request,
      @Param('id_paciente') id_paciente: string,
      @Param('id_consulta') id_consulta: string,
  ) {
      const id_profesional = (req as any).user?.id; 
      return this.consultaService.getConsultasAndNestedEntitiesById(id_profesional, id_paciente, id_consulta);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-id-paciente-and-fecha/:id_paciente/:fecha_hasta')
  async getConsultasByIdAndDate(
    @Req() req: Request,
    @Param('id_paciente') id_paciente: string,
    @Param('fecha_hasta') fecha_hasta: string,
  ) {
    const id_profesional = (req as any).user?.id; 
    return this.consultaService.getConsultasByIdAndDate(id_profesional, id_paciente, fecha_hasta);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createConsulta(
    @Body() createConsultaAllDto: CreateConsultaAllDtoImpl,
    @Req() req: Request
  ) {
    const id_prof = (req as any).user?.id; 
    return this.consultaService.createConsulta(id_prof, createConsultaAllDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateConsulta(
    @Body() updateConsultaAllDtoImpl: UpdateConsultaAllDtoImpl,
    @Req() req: Request
  ) {
    const id_profesional = (req as any).user?.id; 
    return this.consultaService.updateConsulta(id_profesional, updateConsultaAllDtoImpl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id_paciente/:id_consulta')
  async deleteConsulta(
      @Req() req: Request,
      @Param('id_paciente') id_paciente: string,
      @Param('id_consulta') id_consulta: string,
  ) {
      const id_profesional = (req as any).user?.id; 
      return this.consultaService.deleteConsulta(id_profesional, id_paciente, id_consulta);
  }


}
