//local
import { UsuarioEntity } from "../entities/usuario.entity";
//presentation
import { CreateUsuarioDto } from "src/presentation/usuario/dto/create-usuario.dto";
//prisma
import { Rol } from "generated/prisma";

export abstract class UsuarioRepository{    

    abstract getUsuarios(): Promise<UsuarioEntity[]>;
    abstract getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]>;
    abstract getUsuarioById(id: string): Promise<UsuarioEntity>;
    abstract createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>;
    abstract getUsuarioByEmail(email: string): Promise<UsuarioEntity>;
    abstract updateUsuario(id: string, usuario: any): Promise<void>;
    abstract deleteUsuario(id: string): Promise<void>;
    abstract setRefreshToken(id: string, hashedRt: string): Promise<void>;
    abstract removeRefreshToken(id: string): Promise<void>;
}