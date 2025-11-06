//domain - local
import { PlieguesEntity } from "../../entities/pliegues.entity";
import { CreatePlieguesDto } from "src/domain";

export abstract class PlieguesDatasource{
    abstract getPliegues(id_profesional: string, id_paciente: string): Promise<PlieguesEntity[]>;
    abstract getPlieguesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PlieguesEntity | null>;
    abstract createPliegues(id_profesional: string, createPlieguesDto: CreatePlieguesDto): Promise<void>;
    abstract updatePliegues(id_profesional: string, updatePlieguesDto: any): Promise<void>;
    abstract deletePliegues(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}