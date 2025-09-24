
export class ComidaEntity{
    constructor(
        public id: number,
        public descripcion: string,
        public cereal: number,
        public verdura_lc: number,
        public verdura_cg: number,
        public fruta: number,
        public carne: number,
        public legumbre: number,
        public lacteo: number,
        public rico_lipido: number,
        public aceite: number,
        public plan_id: number,
    ){}
}