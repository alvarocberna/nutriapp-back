import { Consulta, Rol } from "generated/prisma"

export class UsuarioEntity{
    constructor( 
        public id: number,    
        public rut: number,
        public dv_rut: string,
        public nombre_primero: string,
        public nombre_segundo: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public correo: string,
        public celular: number,
        public fecha_nacimiento: Date,
        public fecha_creacion: Date,
        public password: string,
        public rol: Rol,
    ) { }
}