import { Module } from '@nestjs/common';
import { PlieguesDatasourceService } from './pliegues.datasource.service';

@Module({
  providers: [PlieguesDatasourceService],
  exports: [PlieguesDatasourceService]
})
export class PlieguesDatasourceModule {}
