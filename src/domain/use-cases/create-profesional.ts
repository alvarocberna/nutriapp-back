//domain
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";
import { CreateProfesionalDto } from "src/domain";

interface CreateProfesionalUseCase{
    execute(data: CreateProfesionalDto): Promise<UsuarioEntity>
}

export class CreateProfesional implements CreateProfesionalUseCase{

    constructor( 
        private readonly usuarioRepository: UsuarioRepository,
    ){ }

    public async execute(createProfesionalDto: CreateProfesionalDto): Promise<UsuarioEntity> {
        const profesional = this.usuarioRepository.createProfesional(createProfesionalDto);
        return profesional;
    }

}