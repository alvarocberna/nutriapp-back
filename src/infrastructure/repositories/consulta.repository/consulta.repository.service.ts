//nest
import { Injectable } from '@nestjs/common';
//domain
import { ConsultaEntity, ConsultaRepository } from 'src/domain';
//infrastructure
import { ConsultaDatasourceService } from 'src/infrastructure/datasources/consulta.datasource/consulta.datasource.service';
//presentation
import { CreateConsultaDto } from 'src/presentation/consulta/dto/create-consulta.dto';

@Injectable()
export class ConsultaRepositoryService implements ConsultaRepository {

  constructor(private readonly consultaDatasourceService: ConsultaDatasourceService) {}

  getConsultas(): Promise<ConsultaEntity[]> {
    return this.consultaDatasourceService.getConsultas();
  }

  getConsultaById(id: number): Promise<ConsultaEntity | null> {
    return this.consultaDatasourceService.getConsultaById(id);
  }

  createConsulta(createConsultaDto: CreateConsultaDto): Promise<void> {
    return this.consultaDatasourceService.createConsulta(createConsultaDto);
  }

  updateConsulta(id: number, consulta: any): Promise<void> {
    return this.consultaDatasourceService.updateConsulta(id, consulta);
  }

  deleteConsulta(id: number): Promise<void> {
    return this.consultaDatasourceService.deleteConsulta(id);
  }

}
