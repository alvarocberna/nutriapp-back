
export class ConsultaEntity{

    constructor(
        public id: number,    
        public fecha_consulta: Date,
        public profesional_id: string,
        public paciente_id: string,
    ) { }

}