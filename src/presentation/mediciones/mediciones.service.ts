//nest
import { Injectable } from '@nestjs/common';
//presentation
import { CreateMedicionesDto } from './dto/create-mediciones.dto';
//infrastructure
import { MedicionesRepositoryService } from 'src/infrastructure';

@Injectable()
export class MedicionesService {

  constructor(
    private readonly medicionesRepository: MedicionesRepositoryService
  ){}

  getMediciones(){
    return this.medicionesRepository.getMediciones();
  }

  createMediciones(createMedicioneDto: CreateMedicionesDto) {
    return this.medicionesRepository.createMediciones(createMedicioneDto);
  }

}
