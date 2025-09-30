import { Module } from '@nestjs/common';
import { ConsultaDatasourceService } from './consulta.datasource.service';

@Module({
  providers: [ConsultaDatasourceService],
  exports: [ConsultaDatasourceService]
})
export class ConsultaDatasourceModule {}
