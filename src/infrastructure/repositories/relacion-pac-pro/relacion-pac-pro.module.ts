//nest
import { Module } from '@nestjs/common';
//infrastructura
import { RelacionPacProRepositoryService } from './relacion-pac-pro.service';
import { RelacionPacProDatasourceModule } from 'src/infrastructure/datasources/relacion-pac-pro/relacion-pac-pro.module';


@Module({
  imports: [RelacionPacProDatasourceModule],
  providers: [RelacionPacProRepositoryService],
  exports: [RelacionPacProRepositoryService],
})
export class RelacionPacProRepositoryModule {}
