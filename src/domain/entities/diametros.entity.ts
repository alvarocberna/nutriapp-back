
export class DiametrosEntity {
  constructor(
    public id: number,
    public humero: number,
    public biestiloideo: number,
    public femur: number,
    public mediciones_id: number,
    public profesional_id: string,
    public paciente_id: string,
  ) { }
}