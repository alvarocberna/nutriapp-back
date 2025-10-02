
export class ConsultaEntity{

    constructor(
        public id: string,    
        public nro_consulta: number,
        public fecha_consulta: Date,
        public descripcion: string,
        public profesional_id: string,
        public paciente_id: string,
    ) { }

}