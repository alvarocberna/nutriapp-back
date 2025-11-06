//local
import { ConsultaEntity } from "../entities/consulta.entity";
import { CreateConsultaDto } from "src/domain";

export abstract class ConsultaDatasource{
    abstract getConsultas(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]>;
    abstract getConsultaById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null>;
    abstract getConsultasAndNestedEntities(id_profesional: string, id_paciente: string): Promise<ConsultaEntity[]>;
    abstract getConsultasAndNestedEntitiesById(id_profesional: string, id_paciente: string, id_consulta: string): Promise<ConsultaEntity | null>;
    abstract createConsulta(id_profesional: string, createConsultaDto: CreateConsultaDto): Promise<void>;
    abstract updateConsulta(id_profesional: string, updateConsultaDto: any): Promise<void>;
    abstract deleteConsulta(id_profesional: string, id_paciente: string, id_consulta: string): Promise<void>;
}