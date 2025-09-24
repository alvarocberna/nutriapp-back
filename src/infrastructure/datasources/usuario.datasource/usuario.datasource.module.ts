//nest
import { Module } from '@nestjs/common';
//local
import { UsuarioDatasourceService } from './usuario.datasource.service';
import { UsuarioDatasourceController } from './usuario.datasource.controller';

@Module({
  imports: [],
  controllers: [UsuarioDatasourceController],
  providers: [UsuarioDatasourceService],
  exports: [UsuarioDatasourceService],
})
export class UsuarioDatasourceModule {}
