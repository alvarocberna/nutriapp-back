//domain - local
import { BasicasEntity } from "../../entities/basicas.entity";
import { CreateBasicasDto } from "src/domain";

export abstract class BasicasDatasource{
    abstract getBasicas(id_profesional: string, id_paciente: string): Promise<BasicasEntity[]>;
    abstract getBasicasById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<BasicasEntity | null>;
    abstract createBasicas(id_profesional: string, createBasicasDto: CreateBasicasDto): Promise<void>;
    abstract updateBasicas(id_profesional: string, updateBasicasDto: any): Promise<void>;
    abstract deleteBasicas(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}