import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post()
  async createConsulta(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.createConsulta(createConsultaDto);
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
