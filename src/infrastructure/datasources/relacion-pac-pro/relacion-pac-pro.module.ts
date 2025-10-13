//nest
import { Module } from '@nestjs/common';
//infrastructure - local
import { RelacionPacProDatasourceService } from './relacion-pac-pro.service';

@Module({
  providers: [RelacionPacProDatasourceService],
  exports: [RelacionPacProDatasourceService]
})
export class RelacionPacProDatasourceModule {}
