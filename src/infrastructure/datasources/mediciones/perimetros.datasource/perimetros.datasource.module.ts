import { Module } from '@nestjs/common';
import { PerimetrosDatasourceService } from './perimetros.datasource.service';

@Module({
  providers: [PerimetrosDatasourceService],
  exports: [PerimetrosDatasourceService]
})
export class PerimetrosDatasourceModule {}
