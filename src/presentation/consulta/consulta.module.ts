import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
//infrastructure
import { ConsultaRepositoryModule } from 'src/infrastructure/repositories/consulta.repository/consulta.repository.module';

@Module({
  imports: [ConsultaRepositoryModule],
  controllers: [ConsultaController],
  providers: [ConsultaService],
  exports: [ConsultaService]
})
export class ConsultaModule {}
