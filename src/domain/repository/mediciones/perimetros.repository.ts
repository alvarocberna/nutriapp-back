//domain - local
import { PerimetrosEntity } from "../../entities/perimetros.entity";
import { CreatePerimetrosDto } from "src/domain";

export abstract class PerimetrosRepository{
    abstract getPerimetros(id_profesional: string, id_paciente: string): Promise<PerimetrosEntity[]>;
    abstract getPerimetrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PerimetrosEntity | null>;
    abstract createPerimetros(id_profesional: string, createPerimetrosDto: CreatePerimetrosDto): Promise<void>;
    abstract updatePerimetros(id_profesional: string, updatePerimetrosDto: any): Promise<void>;
    abstract deletePerimetros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}