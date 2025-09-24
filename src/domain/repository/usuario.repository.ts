//local
import { UsuarioEntity } from "../entities/usuario.entity";
//presentation
import { CreateUsuarioDto } from "src/presentation/usuario/dto/create-usuario.dto";

export abstract class UsuarioRepository{    

    abstract getUsuarios(): Promise<UsuarioEntity[]>;
    abstract getUsuarioById(id: string): Promise<UsuarioEntity>;
    abstract createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>;
    abstract updateUsuario(id: string, usuario: any): Promise<void>;
    abstract deleteUsuario(id: string): Promise<void>;

}

/*
    El repository va a hablar con el origen de datos.
    El objetivo es poder conectar y mandarle un datasource
*/