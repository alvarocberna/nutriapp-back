import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
//infrastructure
import { ConsultaRepositoryModule, MedicionesRepositoryModule, BasicasRepositoryModule, PlieguesRepositoryModule, PerimetrosRepositoryModule, DiametrosRepositoryModule} from 'src/infrastructure';

@Module({
  imports: [ConsultaRepositoryModule, MedicionesRepositoryModule, BasicasRepositoryModule, PlieguesRepositoryModule, PerimetrosRepositoryModule, DiametrosRepositoryModule],
  controllers: [ConsultaController],
  providers: [ConsultaService],
  exports: [ConsultaService]
})
export class ConsultaModule {}
