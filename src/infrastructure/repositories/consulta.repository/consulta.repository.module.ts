import { Module } from '@nestjs/common';
import { ConsultaRepositoryService } from './consulta.repository.service';
import { ConsultaDatasourceModule } from '../../datasources/consulta.datasource/consulta.datasource.module';

@Module({
  imports: [ConsultaDatasourceModule],
  providers: [ConsultaRepositoryService],
  exports: [ConsultaRepositoryService]
})
export class ConsultaRepositoryModule {}
