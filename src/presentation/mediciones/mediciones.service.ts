//nest
import { Injectable } from '@nestjs/common';
//presentation
import { CreateMedicionesDtoImpl } from './dto/create-mediciones.dto';
//infrastructure
import { MedicionesRepositoryService } from 'src/infrastructure';

@Injectable()
export class MedicionesService {

  constructor(
    private readonly medicionesRepository: MedicionesRepositoryService
  ){}

  getMediciones(id_profesional: string, id_paciente: string){
    return this.medicionesRepository.getMediciones(id_profesional, id_paciente);
  }

  createMediciones(id_profesional: string, createMedicioneDto: CreateMedicionesDtoImpl) {
    return this.medicionesRepository.createMediciones(id_profesional, createMedicioneDto);
  }

}
