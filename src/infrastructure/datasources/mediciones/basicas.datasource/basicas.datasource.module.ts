import { Module } from '@nestjs/common';
import { BasicasDatasourceService } from './basicas.datasource.service';

@Module({
  providers: [BasicasDatasourceService],
  exports: [BasicasDatasourceService]
})
export class BasicasDatasourceModule {}
