//nest
import { Module } from '@nestjs/common';
//local
import { UsuarioRepositoryService } from './usuario.repository.service';
import { UsuarioRepositoryController } from './usuario.repository.controller';
//infrastructure
import { UsuarioDatasourceModule } from 'src/infrastructure/datasources/usuario.datasource/usuario.datasource.module';

@Module({
  imports: [UsuarioDatasourceModule],
  controllers: [UsuarioRepositoryController],
  providers: [UsuarioRepositoryService],
  exports: [UsuarioRepositoryService],
})
export class UsuarioRepositoryModule {}
