import { Module } from '@nestjs/common';
import { DiametrosDatasourceService } from './diametros.datasource.service';

@Module({
  providers: [DiametrosDatasourceService],
  exports: [DiametrosDatasourceService]
})
export class DiametrosDatasourceModule {}
