//nest
import { Module } from '@nestjs/common';
//presentation
import { MedicionesService } from './mediciones.service';
import { MedicionesController } from './mediciones.controller';
//infrastructure
import { MedicionesRepositoryModule } from 'src/infrastructure';

@Module({
  imports: [MedicionesRepositoryModule],
  controllers: [MedicionesController],
  providers: [MedicionesService],
})
export class MedicionesModule {}
