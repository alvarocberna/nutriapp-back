


export class UsuarioEntity{

    constructor(
        public id: number,    
        public password: string,
        public rut: number,
        public dv_rut: string,
        public nombre_primero: string,
        public nombre_segundo: string,
        public ap_paterno: string,
        public ap_materno: string,
        public correo: string,
        public celular: number,
        public fecha_nac: Date,
        public fecha_creacion: Date,
        public rol_id: number,
        public comuna_id: number,
    ) { }

}