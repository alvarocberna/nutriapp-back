//nest
import { Injectable } from '@nestjs/common';
//domain
import { UsuarioRepository } from 'src/domain/repository/usuario.repository';
import { UsuarioEntity } from 'src/domain/entities/usuario.entity';
//infrastructure
import { UsuarioDatasourceService } from 'src/infrastructure/datasources/usuario.datasource/usuario.datasource.service';
//presentation
import { CreateUsuarioDto } from 'src/presentation/usuario/dto/create-usuario.dto';


@Injectable()
export class UsuarioRepositoryService implements UsuarioRepository {
        constructor(
            private readonly usuarioDatasource: UsuarioDatasourceService
        ){}
    
        async getUsuarios(): Promise<UsuarioEntity[]> {
            return this.usuarioDatasource.getUsuarios();
        }
        async getUsuarioById(id: string): Promise<UsuarioEntity> {
            return this.usuarioDatasource.getUsuarioById(id);
        }
        async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
            const usuario = await this.usuarioDatasource.createUsuario(createUsuarioDto);
            return usuario;
        }
        async updateUsuario(id: string, usuario: any): Promise<void> {
            this.usuarioDatasource.updateUsuario(id, usuario);
            // return Promise.resolve();
        }
        async deleteUsuario(id: string): Promise<void> {
            this.usuarioDatasource.deleteUsuario(id);
        }
}
