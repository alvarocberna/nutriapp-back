//domain
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";
import { RelacionPacProRepository } from "../repository/relacion-pac-pro.repository";
import { CreatePacienteDto } from "src/domain";

interface CreatePacienteUseCase{
    execute(id_prof: string, data: CreatePacienteDto): Promise<UsuarioEntity>
}

export class CreatePaciente implements CreatePacienteUseCase{

    constructor( 
        private readonly usuarioRepository: UsuarioRepository,
        private readonly relacionPacProRepository: RelacionPacProRepository
    ){ }

    public async execute(id_prof: string, createPacienteDto: CreatePacienteDto): Promise<UsuarioEntity> {

        const id_profesional = id_prof;

        const paciente = this.usuarioRepository.createPaciente(createPacienteDto);

        const id_paciente = (await paciente).id;

        this.relacionPacProRepository.createRelacion(id_paciente, id_profesional);
        
        return paciente;

    }

}