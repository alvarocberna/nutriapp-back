import { Injectable } from '@nestjs/common';
import { CreateConsultaAllDtoImpl } from './dto/create-consulta.dto';
import { UpdateConsultaAllDtoImpl } from './dto/update-consulta.dto';
//domain
import { CreateConsultaUseCase, UpdateConsultaUseCase } from 'src/domain';
//infrastructure
import { ConsultaRepositoryService, MedicionesRepositoryService, BasicasRepositoryService, PlieguesRepositoryService, PerimetrosRepositoryService, DiametrosRepositoryService, ResultadosMedRepositoryService} from 'src/infrastructure';

@Injectable()
export class ConsultaService {

  constructor(
    private readonly consultaRepository: ConsultaRepositoryService,
    private readonly medicionesRepository: MedicionesRepositoryService,
    private readonly basicasRepository: BasicasRepositoryService,
    private readonly plieguesRepository: PlieguesRepositoryService,
    private readonly perimetrosRepository: PerimetrosRepositoryService,
    private readonly diametrosRepository: DiametrosRepositoryService,
    private readonly resultadosMedRepository: ResultadosMedRepositoryService,
  ){}

  createConsulta(id_prof: string, createConsultaFullDto: CreateConsultaAllDtoImpl) {
    new CreateConsultaUseCase(this.consultaRepository, this.medicionesRepository, this.basicasRepository, this.plieguesRepository, this.perimetrosRepository, this.diametrosRepository, this.resultadosMedRepository).execute(id_prof, createConsultaFullDto);
    return Promise.resolve(); 
  }

  getConsultasAndNestedEntities(id_profesional: string, id_paciente: string){
    return this.consultaRepository.getConsultasAndNestedEntities(id_profesional, id_paciente);
  }

  getConsultasAndNestedEntitiesById(id_profesional: string, id_paciente: string, id_consulta: string){
    return this.consultaRepository.getConsultasAndNestedEntitiesById(id_profesional, id_paciente, id_consulta);
  }

  getConsultasByIdAndDate(id_profesional: string, id_paciente: string, fecha_hasta: string){
    return this.consultaRepository.getConsultasByIdAndDate(id_profesional, id_paciente, fecha_hasta);
  }

  updateConsulta(id_prof: string, updateConsultaAllDtoImpl: UpdateConsultaAllDtoImpl) {
    new UpdateConsultaUseCase(this.consultaRepository, this.medicionesRepository, this.basicasRepository, this.plieguesRepository, this.perimetrosRepository, this.diametrosRepository, this.resultadosMedRepository).execute(id_prof, updateConsultaAllDtoImpl);
    return Promise.resolve(); 
  }

  deleteConsulta(id_prof: string, id_paciente: string, id_consulta: string) {
    return this.consultaRepository.deleteConsulta(id_prof, id_paciente, id_consulta);
  }
  
}
