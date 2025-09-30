import { Module } from '@nestjs/common';
import { MedicionesDatasourceService } from './mediciones.datasource.service';

@Module({
  providers: [MedicionesDatasourceService],
  exports: [MedicionesDatasourceService]
})
export class MedicionesDatasourceModule {}
