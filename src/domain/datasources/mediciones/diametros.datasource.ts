//domain - local
import { DiametrosEntity } from "../../entities/diametros.entity";
import { CreateDiametrosDto } from "src/domain";

export abstract class DiametrosDatasource{
    abstract getDiametros(id_profesional: string, id_paciente: string): Promise<DiametrosEntity[]>;
    abstract getDiametrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<DiametrosEntity | null>;
    abstract createDiametros(id_profesional: string, createDiametrosDto: CreateDiametrosDto): Promise<void>;
    abstract updateDiametros(id_profesional: string, updateDiametrosDto: any): Promise<void>;
    abstract deleteDiametros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}