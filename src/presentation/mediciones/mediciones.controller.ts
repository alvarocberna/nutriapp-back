//nest
import { Controller, Get, Post, Body, Req, Query, UseGuards } from '@nestjs/common';
//presentation
import { MedicionesService } from './mediciones.service';
import { CreateMedicionesDtoImpl } from './dto/create-mediciones.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
//express
import type {Request} from 'express';


@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMediciones(
    @Query('id_paciente') id_paciente: string,
    @Req() req: Request
  ) {
    const id_profesional = (req as any).user?.id;
    return this.medicionesService.getMediciones(id_profesional, id_paciente);
  }

}
