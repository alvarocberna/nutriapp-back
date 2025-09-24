
export class PerimetrosEntity{
    constructor(
        public id: number,
        public brazo_relajado: number,
        public brazo_flexionado: number,
        public cintura: number,
        public cadera: number,
        public muslo_medio: number,
        public pierna: number,
        public mediciones_id: number,
    ){}
}