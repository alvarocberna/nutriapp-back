import { Module } from '@nestjs/common';
import { PerimetrosRepositoryService } from './perimetros.repository.service';
//infrastructure
import { PerimetrosDatasourceModule } from 'src/infrastructure';

@Module({
  imports: [PerimetrosDatasourceModule],
  providers: [PerimetrosRepositoryService],
  exports: [PerimetrosRepositoryService],
})
export class PerimetrosRepositoryModule {}
