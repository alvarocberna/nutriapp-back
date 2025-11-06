//nest
import { Injectable } from '@nestjs/common';
//domain
import { CreatePacienteDto, CreateUsuarioDto, CreateProfesionalDto, UsuarioEntity, UsuarioRepository } from 'src/domain';
//infrastructure
import { UsuarioDatasourceService } from 'src/infrastructure/datasources/usuario.datasource/usuario.datasource.service';
//prisma
import { Rol } from 'generated/prisma';


@Injectable()
export class UsuarioRepositoryService implements UsuarioRepository {
        constructor(
            private readonly usuarioDatasource: UsuarioDatasourceService
        ){}
    
        //USUARIOS (7)
        async getUsuarios(): Promise<UsuarioEntity[]> {
            return this.usuarioDatasource.getUsuarios();
        }
        async getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]> {
            return this.usuarioDatasource.getUsuarioByRol(rol);
        }
        async getUsuarioById(id: string): Promise<UsuarioEntity> {
            return this.usuarioDatasource.getUsuarioById(id);
        }
        async getUsuarioByEmail(email: string): Promise<UsuarioEntity> {
            return this.usuarioDatasource.getUsuarioByEmail(email);
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

        //PACIENTES (2)
        async getPacientesByProfId(id: string, {search, fechaInicio, fechaFin, edadMinima, edadMaxima}): Promise<UsuarioEntity[]>{
            return this.usuarioDatasource.getPacientesByProfId(id, {search, fechaInicio, fechaFin, edadMinima, edadMaxima});
        }
        async createPaciente(createPacienteDto: CreatePacienteDto): Promise<UsuarioEntity> {
            return this.usuarioDatasource.createPaciente(createPacienteDto);
        }

        //PROFESIONALES (2)
        async getProfesionalById(id_prof: string): Promise<UsuarioEntity> {
            return this.usuarioDatasource.getProfesionalById(id_prof);
        }
        async createProfesional(createProfesionalDto: CreateProfesionalDto){
            return this.createProfesional(createProfesionalDto);
        }

        //TOKENS (2)
        async setRefreshToken(id: string, hashedRt: string) {
            this.usuarioDatasource.setRefreshToken(id, hashedRt);
        }
        async removeRefreshToken(id: string) {
            this.usuarioDatasource.removeRefreshToken(id);
        }

}
