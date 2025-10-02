//local
import { ConsultaEntity } from "../entities/consulta.entity";
//presentation
import { CreateConsultaDto } from "src/presentation/consulta/dto/create-consulta.dto";

export abstract class ConsultaRepository{
    abstract getConsultas(): Promise<ConsultaEntity[]>;
    abstract getConsultaById(id: string): Promise<ConsultaEntity | null>;
    abstract createConsulta(createConsultaDto: CreateConsultaDto): Promise<void>;
    abstract updateConsulta(id: string, consulta: any): Promise<void>;
    abstract deleteConsulta(id: string): Promise<void>;
}