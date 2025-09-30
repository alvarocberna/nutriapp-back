//nest
import { Module } from '@nestjs/common';
//domain

//infrastructure
import { UsuarioRepositoryModule } from 'src/infrastructure/repositories/usuario.repository/usuario.repository.module';
//presentation - local
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [UsuarioRepositoryModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
