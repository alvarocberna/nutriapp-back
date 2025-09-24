//nest
import { Module } from '@nestjs/common';
//local
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
//infrastructure
import { UsuarioRepositoryModule } from 'src/infrastructure/repositories/usuario.repository/usuario.repository.module';

@Module({
  imports: [UsuarioRepositoryModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
