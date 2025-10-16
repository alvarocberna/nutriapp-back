//nest
import { Module } from '@nestjs/common';
//local (infrastructure)
import { UsuarioDatasourceService } from './usuario.datasource.service';
import { UuidModule } from 'src/infrastructure/adapters/uuid/uuid.module';
import { PassHasherModule } from 'src/infrastructure/adapters/pass-hasher/pass-hasher.module';


@Module({
  imports: [UuidModule, PassHasherModule],
  providers: [UsuarioDatasourceService],
  exports: [UsuarioDatasourceService],
})
export class UsuarioDatasourceModule {}
