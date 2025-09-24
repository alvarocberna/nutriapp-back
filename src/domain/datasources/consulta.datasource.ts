//local
import { ConsultaEntity } from "../entities/consulta.entity";

export abstract class ConsultaDatasource{
    abstract getConsultas(): Promise<ConsultaEntity[]>;
    abstract getConsultaById(id: string): Promise<ConsultaEntity>;
    abstract createConsulta(consulta: ConsultaEntity): Promise<void>;
    abstract updateConsulta(id: string, consulta: any): Promise<void>;
    abstract deleteConsulta(id: string): Promise<void>;
}