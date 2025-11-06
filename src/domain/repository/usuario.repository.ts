//local
import { UsuarioEntity } from "../entities/usuario.entity";
//domain
import { CreateUsuarioDto, CreatePacienteDto, CreateProfesionalDto } from "src/domain";
//prisma
import { Rol } from "generated/prisma";

export abstract class UsuarioRepository{    
    //USUARIOS (7)
    abstract getUsuarios(): Promise<UsuarioEntity[]>;
    abstract getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]>;
    abstract getUsuarioById(id: string): Promise<UsuarioEntity>;
    abstract createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>;
    abstract getUsuarioByEmail(email: string): Promise<UsuarioEntity>;
    abstract updateUsuario(id: string, usuario: any): Promise<void>;
    abstract deleteUsuario(id: string): Promise<void>;
    //PACIENTES (2)
    abstract createPaciente(createPacienteDto: CreatePacienteDto): Promise<UsuarioEntity>;
    abstract getPacientesByProfId(id: string, {search, fechaInicio, fechaFin, edadMinima, edadMaxima}): Promise<UsuarioEntity[]>;
    //PROFESIONALES (2)
    abstract createProfesional(createProfesionalDto: CreateProfesionalDto): Promise<UsuarioEntity>;
    abstract getProfesionalById(id: string): Promise<UsuarioEntity>;
    //TOKENS (2)
    abstract setRefreshToken(id: string, hashedRt: string): Promise<void>;
    abstract removeRefreshToken(id: string): Promise<void>;
}