//nest
import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
//presentation
import { MedicionesService } from './mediciones.service';
import { CreateMedicionesDtoImpl } from './dto/create-mediciones.dto';
// import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
//express
import type {Request} from 'express';


@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService) {}

  @Get()
  getMediciones(
    @Query('id_paciente') id_paciente: string,
    @Req() req: Request
  ) {
    const id_profesional = (req as any).user?.id;
    return this.medicionesService.getMediciones(id_profesional, id_paciente);
  }

  //este endpoint está MAL porque lieral solo crea una entidad Medicion que tiene 3 campos, no el conjunto de mediciones completo
  //lo bueno es que no se usa por el momento
  @Post()
  createMediciones(
    @Req() req: Request,
    @Body() createMedicionesDto: CreateMedicionesDtoImpl
  ) {
    const id_profesional = (req as any).user?.id;
    return this.medicionesService.createMediciones(id_profesional, createMedicionesDto);
  }

}
