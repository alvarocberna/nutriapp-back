
export class ConsultaEntity{

    constructor(
        public id: number,    
        public fecha_consulta: Date,
        public profesional_id: number,
        public paciente_id: number,
    ) { }

}