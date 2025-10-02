import { Module } from '@nestjs/common';
import { MedicionesRepositoryService } from './mediciones.repository.service';
//infrastructure
import { MedicionesDatasourceModule } from 'src/infrastructure/datasources/mediciones/mediciones.datasource/mediciones.datasource.module';

@Module({
  imports: [MedicionesDatasourceModule],
  providers: [MedicionesRepositoryService],
  exports: [MedicionesRepositoryService],
})
export class MedicionesRepositoryModule {}
