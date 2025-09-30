//nest
import { Inject, Injectable } from '@nestjs/common';
//domain
import { UsuarioEntity } from './domain/entities/usuario.entity';
//infrastructure
// import { UsuarioDatasourceService } from './infrastructure/datasources/usuario.datasource/usuario.datasource.service';
// import { UsuarioEntity } from './domain/entities/usuario.entity';
//presentation
import { UsuarioService } from './presentation/usuario/usuario.service';

@Injectable()
export class AppService {

  constructor(private readonly usuarioService: UsuarioService) {}

  // constructor(
  //   @Inject('UsuarioRepository')
  //   private readonly usuarioDatasourceService:  UsuarioDatasourceService,
  // ) {}

  // async getUsuarios(): Promise<UsuarioEntity[]> {
  //   const usuarios = await this.usuarioDatasourceService.getUsuarios();
  //   return usuarios;
  // }

  async getHello(): Promise<UsuarioEntity[]> {
    return this.usuarioService.getUsuarios();
    // return 'hello';
  }
}
