
export class MedicionesEntity{
    constructor(
        public id: number,
        public nro_medicion: number,
        public nivel: string,
        public descripcion: string,
        public consulta_id: string,
        public profesional_id: string,
        public paciente_id: string,
    ){}
}