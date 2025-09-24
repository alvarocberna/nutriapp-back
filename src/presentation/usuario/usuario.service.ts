import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from 'src/domain/entities/usuario.entity';
import {UsuarioRepositoryService} from '../../infrastructure/repositories/usuario.repository/usuario.repository.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepositoryService) {}
    
    async getPacientes(): Promise<UsuarioEntity[]>{
        return this.usuarioRepository.getUsuarios();
    }

    async getPaciente(id: string){
        return this.usuarioRepository.getUsuarioById(id);
    }

    async createPaciente(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>{
        return this.usuarioRepository.createUsuario(createUsuarioDto)
    }

    async updatePaciente(){
    return 'paciente';
    }

    async deletePaciente(){
    return 'paciente';
    }

}
