//nest
import { Injectable } from '@nestjs/common';
//domain
import { CreatePaciente, CreateUsuarioDto, UsuarioEntity } from 'src/domain';
//infrastructure
import {UsuarioRepositoryService} from '../../infrastructure/repositories/usuario.repository/usuario.repository.service';
import { RelacionPacProRepositoryService } from 'src/infrastructure/repositories/relacion-pac-pro/relacion-pac-pro.service';
//presentation
//prisma
import { Rol } from 'generated/prisma';

@Injectable()
export class UsuarioService {

    constructor(
        private readonly usuarioRepository: UsuarioRepositoryService,
        private readonly relacionPacProRepository: RelacionPacProRepositoryService,
    ) {}
    
    //USUARIOS (7)
    async getUsuarios(): Promise<UsuarioEntity[]>{
        return this.usuarioRepository.getUsuarios();
    }

    async getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]>{
        return this.usuarioRepository.getUsuarioByRol(rol)
    }

    async getUsuarioById(id: string){
        return this.usuarioRepository.getUsuarioById(id);
    }

    async getUsuarioByEmail(email: string){
        return this.usuarioRepository.getUsuarioByEmail(email);
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>{
        return this.usuarioRepository.createUsuario(createUsuarioDto)
    }
    
    async updateUsuario(){
        return 'paciente';
    }

    async deleteUsuario(){
        return 'paciente';
    }

    //PACIENTES (2)
    async createPaciente(id_prof: string, createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>{
        const newPaciente = new CreatePaciente(this.usuarioRepository, this.relacionPacProRepository)
        return newPaciente.execute(id_prof, createUsuarioDto);
    }

    async getPacientesByProfId(id: string, {search, fechaInicio, fechaFin}): Promise<UsuarioEntity[]>{
        return this.usuarioRepository.getPacientesByProfId(id, {search, fechaInicio, fechaFin});
    }

    //TOKENS (2)
    async setRefreshToken(userId: string, refreshToken: string) {
        return this.usuarioRepository.setRefreshToken(userId, refreshToken);
    }

    async removeRefreshToken(userId: string) {
        return this.usuarioRepository.removeRefreshToken(userId);
    }

}
