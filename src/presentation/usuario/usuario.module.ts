//nest
import { Module } from '@nestjs/common';
//infrastructure
import { UsuarioRepositoryModule } from 'src/infrastructure/repositories/usuario.repository/usuario.repository.module';
import { RelacionPacProRepositoryModule } from 'src/infrastructure/repositories/relacion-pac-pro/relacion-pac-pro.module';
//presentation - local
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';


@Module({
  imports: [UsuarioRepositoryModule, RelacionPacProRepositoryModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
