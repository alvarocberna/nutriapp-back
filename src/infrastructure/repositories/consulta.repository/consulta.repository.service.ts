//nest
import { Injectable } from '@nestjs/common';
//domain
import { ConsultaEntity, ConsultaRepository } from 'src/domain';
//infrastructure
import { ConsultaDatasourceService } from 'src/infrastructure/datasources/consulta.datasource/consulta.datasource.service';
//presentation
import { CreateConsultaDto } from 'src/domain';

@Injectable()
export class ConsultaRepositoryService implements ConsultaRepository {

  constructor(private readonly consultaDatasourceService: ConsultaDatasourceService) {}

  getConsultas(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]> {
    return this.consultaDatasourceService.getConsultas(id_profesional, id_paciente);
  }

  getConsultaById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null> {
    return this.consultaDatasourceService.getConsultaById(id_profesional, id_paciente, id_consulta);
  }

  getConsultasAndNestedEntities(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]> {
    return this.consultaDatasourceService.getConsultasAndNestedEntities(id_profesional, id_paciente);
  }

  getConsultasAndNestedEntitiesById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null> {
    return this.consultaDatasourceService.getConsultasAndNestedEntitiesById(id_profesional, id_paciente, id_consulta);
  }

  createConsulta(id_profesional: string, createConsultaDto: CreateConsultaDto): Promise<void> {
    return this.consultaDatasourceService.createConsulta(id_profesional, createConsultaDto);
  }

  updateConsulta(id_profesional: string, updateConsultaDto: any): Promise<void> {
    return this.consultaDatasourceService.updateConsulta(id_profesional, updateConsultaDto);
  }

  deleteConsulta(id_profesional: string, id_paciente: string, id_consulta: string): Promise<void> {
    return this.consultaDatasourceService.deleteConsulta(id_profesional, id_paciente, id_consulta);
  }

}
