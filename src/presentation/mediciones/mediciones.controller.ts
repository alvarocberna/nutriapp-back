import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicionesService } from './mediciones.service';
import { CreateMedicionesDto } from './dto/create-medicione.dto';

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
