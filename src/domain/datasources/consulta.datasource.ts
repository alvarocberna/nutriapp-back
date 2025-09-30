//local
import { ConsultaEntity } from "../entities/consulta.entity";
//presentation
import { CreateConsultaDto } from "src/presentation/consulta/dto/create-consulta.dto";

export abstract class ConsultaDatasource{
    abstract getConsultas(): Promise<ConsultaEntity[]>;
    abstract getConsultaById(id: number): Promise<ConsultaEntity | null>;
    abstract createConsulta(createConsultaDto: CreateConsultaDto): Promise<void>;
    abstract updateConsulta(id: number, consulta: any): Promise<void>;
    abstract deleteConsulta(id: number): Promise<void>;
}