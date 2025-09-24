//domain
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repository/usuario.repository";

interface GetAllPacientesUseCase{
    execute(): Promise<UsuarioEntity[]>
}

export class GetAllPacientes implements GetAllPacientesUseCase{
    /*
        Vamos a inyectar el repository
        casi siempre los casos de uso van a inyectar algún tipo de repositorio
    */
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){ }

    async execute(): Promise<UsuarioEntity[]> {

        const users = this.usuarioRepository.getUsuarios();

        return users;

    }

}