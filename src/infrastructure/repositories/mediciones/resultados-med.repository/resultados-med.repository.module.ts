import { Module } from '@nestjs/common';
import { ResultadosMedRepositoryService } from './resultados-med.repository.service';
import { ResultadosMedDatasourceModule } from 'src/infrastructure/datasources/mediciones/resultados-med.datasource/resultados-med.datasource.module';

@Module({
  imports: [ResultadosMedDatasourceModule],
  providers: [ResultadosMedRepositoryService],
  exports: [ResultadosMedRepositoryService],
})
export class ResultadosMedRepositoryModule {}
