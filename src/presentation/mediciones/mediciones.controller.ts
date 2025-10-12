//nest
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
//presentation
import { MedicionesService } from './mediciones.service';
import { CreateMedicionesDto } from './dto/create-mediciones.dto';
// import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';


@Controller('mediciones')
export class MedicionesController {
  constructor(private readonly medicionesService: MedicionesService) {}

  @Get()
  getMediciones() {
    return this.medicionesService.getMediciones();
  }

  @Post()
  createMediciones(@Body() createMedicionesDto: CreateMedicionesDto) {
    return this.medicionesService.createMediciones(createMedicionesDto);
  }

}
