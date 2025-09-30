import { Module } from '@nestjs/common';
import { MedicionesService } from './mediciones.service';
import { MedicionesController } from './mediciones.controller';
import { MedicionesRepositoryModule } from 'src/infrastructure/repositories/mediciones.repository/mediciones.repository.module';

@Module({
  imports: [MedicionesRepositoryModule],
  controllers: [MedicionesController],
  providers: [MedicionesService],
})
export class MedicionesModule {}
