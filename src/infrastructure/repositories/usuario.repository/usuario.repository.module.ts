//nest
import { Module } from '@nestjs/common';
//local
import { UsuarioRepositoryService } from './usuario.repository.service';
//infrastructure
import { UsuarioDatasourceModule } from 'src/infrastructure/datasources/usuario.datasource/usuario.datasource.module';

@Module({
  imports: [UsuarioDatasourceModule],
  providers: [UsuarioRepositoryService],
  exports: [UsuarioRepositoryService],
})
export class UsuarioRepositoryModule {}
