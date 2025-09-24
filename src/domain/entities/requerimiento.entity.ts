
export class RequerimientoEntity{
    constructor(
        public id: number,
        public descripcion: string,
        public tmb: number,
        public actividad_fisica: number,
        public termogenesis: number,
        public ejercicio_fisico: number,
        public f_patologias: number,
        public f_crecimiento: number,
        public get: number,
        public balance: number,
        public dist_proteina: number,
        public dist_carbohidrato: number,
        public dist_lipido: number,
        public req_cal: number,
        public req_proteina: number,
        public req_carbohidrato: number,
        public req_lipido: number,
        public plan_id: number,
    ){}

}