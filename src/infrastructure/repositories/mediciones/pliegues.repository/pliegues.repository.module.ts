import { Module } from '@nestjs/common';
import { PlieguesRepositoryService } from './pliegues.repository.service';
//infrastructure
import { PlieguesDatasourceModule } from 'src/infrastructure';

@Module({
  imports: [PlieguesDatasourceModule],
  providers: [PlieguesRepositoryService],
  exports: [PlieguesRepositoryService],
})
export class PlieguesRepositoryModule {}
