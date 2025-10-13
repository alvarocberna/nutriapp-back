//domain - local
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";
import { RelacionPacProRepository } from "../repository/relacion-pac-pro.repository";
//presentation
import { CreateUsuarioDto } from "src/presentation/usuario/dto/create-usuario.dto";

interface CreatePacienteUseCase{
    execute(data: CreateUsuarioDto): Promise<UsuarioEntity>
}

export class CreatePaciente implements CreatePacienteUseCase{

    constructor( 
        private readonly usuarioRepository: UsuarioRepository,
        private readonly relacionPacProRepository: RelacionPacProRepository
    ){ }

    public async execute(data: CreateUsuarioDto): Promise<UsuarioEntity> {

        const id_profesional = data.id_profesional;

        const usuario = this.usuarioRepository.createUsuario(data);

        const id_paciente = (await usuario).id;

        this.relacionPacProRepository.createRelacion(id_paciente, id_profesional);
        
        return usuario;

    }

}