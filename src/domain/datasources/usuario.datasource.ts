//local
import { UsuarioEntity } from "../entities/usuario.entity";
//presentation 
import { CreateUsuarioDto } from "src/presentation/usuario/dto/create-usuario.dto";
//prisma
import { Rol } from "generated/prisma";
/*
    Aquí al parecer usamos el patrón repository
    Definimos los métodos que tendrá nuestra entidad
    Esto normalmente se haría todo junto en la clase de la entidad
    pero supongo que por ser Clearn Architecture se hace separado
*/

export abstract class UsuarioDatasource{    
    /*
        Una clase abstracta es una clase que no se puede instanciar directamente
        es decir está pensada para que otras clases hereden de ella solamente.
        Una clase abstracta es utilizada en POO, y es util para definir contratos comunes
        interesante saber que las clases abstractas no están disponibles de forma nativa
        en JS, pero si en TS
    */
    abstract getUsuarios(): Promise<UsuarioEntity[]>;
    abstract getUsuarioByRol(rol: Rol): Promise<UsuarioEntity[]>;
    abstract getUsuarioById(id: string): Promise<UsuarioEntity>;
    abstract createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity>;
    abstract updateUsuario(id: string, usuario: any): Promise<void>;
    abstract deleteUsuario(id: string): Promise<void>;
    /*
        Qué un método sea abstracto significa que toda clase que herede esta clase tendrá
        que implementar los métodos abstractos definidos. Implementar significa que
        debe declararse el método y definirse el comportamiento o lógica
    */

}