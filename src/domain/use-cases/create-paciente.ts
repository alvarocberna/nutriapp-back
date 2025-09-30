//domain - local
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";
//presentation
import { CreateUsuarioDto } from "src/presentation/usuario/dto/create-usuario.dto";

interface CreatePacienteUseCase{
    execute(data: CreateUsuarioDto): Promise<UsuarioEntity>
}

export class CreatePaciente implements CreatePacienteUseCase{

    constructor( 
        private readonly usuarioRepository: UsuarioRepository
    ){ }

    public async execute(data: CreateUsuarioDto): Promise<UsuarioEntity> {

        return this.usuarioRepository.createUsuario(data);

    }

}