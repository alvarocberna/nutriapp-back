import { Module } from '@nestjs/common';
import { DiametrosRepositoryService } from './diametros.repository.service';
//infrastructure
import { DiametrosDatasourceModule } from 'src/infrastructure';

@Module({
  imports: [DiametrosDatasourceModule],
  providers: [DiametrosRepositoryService],
  exports: [DiametrosRepositoryService],
})
export class DiametrosRepositoryModule {}
