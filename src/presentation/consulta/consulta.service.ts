import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
//domain
import { CreateConsulta } from 'src/domain';
//infrastructure
import { ConsultaRepositoryService } from 'src/infrastructure/repositories/consulta.repository/consulta.repository.service';

@Injectable()
export class ConsultaService {

  constructor(private readonly consultaRepository: ConsultaRepositoryService){}

  createConsulta(createConsultaDto: CreateConsultaDto) {
    new CreateConsulta(this.consultaRepository).execute(createConsultaDto);
    return Promise.resolve(); 
  }

}
