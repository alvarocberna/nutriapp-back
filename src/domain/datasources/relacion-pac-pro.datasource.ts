import { UsuarioEntity } from "../entities/usuario.entity";

export abstract class RelacionPacProDatasource{
    abstract createRelacion(pacienteId: string, profesionalId: string): Promise<void>;
    abstract getProfesionalesByPaciente(pacienteId: string): Promise<UsuarioEntity[]>;
    abstract getPacientesByProfesional(profesionalId: string): Promise<UsuarioEntity[]>;
    abstract deleteRelacion(pacienteId: string, profesionalId: string): Promise<void>;
}