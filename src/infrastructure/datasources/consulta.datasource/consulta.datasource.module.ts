import { Module } from '@nestjs/common';
import { ConsultaDatasourceService } from './consulta.datasource.service';
import { UuidModule } from 'src/infrastructure/adapters/uuid/uuid.module';

@Module({
  imports: [UuidModule],
  providers: [ConsultaDatasourceService],
  exports: [ConsultaDatasourceService]
})
export class ConsultaDatasourceModule {}
