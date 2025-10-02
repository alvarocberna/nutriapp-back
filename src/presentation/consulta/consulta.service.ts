import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { CreateConsultaFullDto } from './dto/create-consulta.dto';
//domain
import { CreateConsulta } from 'src/domain';
//infrastructure
import { ConsultaRepositoryService, MedicionesRepositoryService, BasicasRepositoryService, PlieguesRepositoryService, PerimetrosRepositoryService, DiametrosRepositoryService} from 'src/infrastructure';

@Injectable()
export class ConsultaService {

  constructor(
    private readonly consultaRepository: ConsultaRepositoryService,
    private readonly medicionesRepository: MedicionesRepositoryService,
    private readonly basicasRepository: BasicasRepositoryService,
    private readonly plieguesRepository: PlieguesRepositoryService,
    private readonly perimetrosRepository: PerimetrosRepositoryService,
    private readonly diametrosRepository: DiametrosRepositoryService
  ){}

  createConsulta(createConsultaFullDto: CreateConsultaFullDto) {
    new CreateConsulta(this.consultaRepository, this.medicionesRepository, this.basicasRepository, this.plieguesRepository, this.perimetrosRepository, this.diametrosRepository).execute(createConsultaFullDto);
    return Promise.resolve(); 
  }

}
