import { Module } from '@nestjs/common';
import { ResultadosMedDatasourceService } from './resultados-med.datasource.service';

@Module({
  providers: [ResultadosMedDatasourceService],
  exports: [ResultadosMedDatasourceService]
})
export class ResultadosMedDatasourceModule {}
