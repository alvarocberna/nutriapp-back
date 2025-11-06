//nest
import { Controller, Get, Post, Body, Req, UseGuards, Query, Param } from '@nestjs/common';
//express
import type {Request} from 'express'
//presentation
import { ConsultaService } from './consulta.service';
import { CreateConsultaAllDtoImpl } from './dto/create-consulta.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  // @UseGuards(JwtAuthGuard)
  @Get(':id_paciente')
  async getConsultasAndNestedEntities(
    @Req() req: Request,
    @Param('id_paciente') id_paciente: string,
  ) {
    // const id_profesional = (req as any).user?.id;
    const id_profesional = '454235ef-c3af-4fda-80cb-59ecb83523d5';
    return this.consultaService.getConsultasAndNestedEntities(id_profesional, id_paciente);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id_paciente/:id_consulta')
  async getConsultasAndNestedEntitiesById(
    @Req() req: Request,
    @Param('id_paciente') id_paciente: string,
    @Param('id_consulta') id_consulta: string,
  ) {
    const id_profesional = (req as any).user?.id; 
    // const id_profesional = '454235ef-c3af-4fda-80cb-59ecb83523d5';
    return this.consultaService.getConsultasAndNestedEntitiesById(id_profesional, id_paciente, id_consulta);
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



  // @Get()
  // findAll() {
  //   return this.consultaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.consultaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateConsultaDto: UpdateConsultaDto) {
  //   return this.consultaService.update(+id, updateConsultaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.consultaService.remove(+id);
  // }
}
