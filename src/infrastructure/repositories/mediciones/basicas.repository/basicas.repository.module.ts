//nest
import { Module } from '@nestjs/common';
//infrastructure
import { BasicasRepositoryService } from './basicas.repository.service';
import { BasicasDatasourceModule } from 'src/infrastructure';

@Module({
  imports: [BasicasDatasourceModule],
  providers: [BasicasRepositoryService],
  exports: [BasicasRepositoryService],
})
export class BasicasRepositoryModule {}
