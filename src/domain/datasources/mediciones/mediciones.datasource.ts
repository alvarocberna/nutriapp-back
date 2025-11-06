//domain - local
import { MedicionesEntity } from "../../entities/mediciones.entity";
import { CreateMedicionesDto } from "src/domain";

export abstract class MedicionesDatasource{
    abstract getMediciones(id_profesional: string, id_paciente: string): Promise<MedicionesEntity[]>;
    abstract getMedicionesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<MedicionesEntity | null>;
    abstract createMediciones(id_profesional: string, createMedicionesDto: CreateMedicionesDto): Promise<void>;
    abstract updateMediciones(id_profesional: string, updateMedicionesDto: any): Promise<void>;
    abstract deleteMediciones(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}