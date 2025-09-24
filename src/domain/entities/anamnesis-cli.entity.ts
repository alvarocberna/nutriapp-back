
export class AnamnesisCliEntity {

    constructor(
        public id : number,
        public patologias: string,
        public antecedentes_fam: string,
        public alergias: string,
        public intolerancias: string,
        public farmacos: string,
        public antecedentes_gi: string,
        public cirugias: string,
        public deposiciones: string,
        public examenes: string,
        public anamnesis_id: number,
    ){}

}