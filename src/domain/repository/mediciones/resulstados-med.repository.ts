//domain - local
import { ResultadosMedEntity } from "../../entities/resultados-med.entity";
import { CreateMedicionesAllDto} from 'src/domain';
//presentation

export abstract class ResultadosMedRepository{
    abstract getResultadosMed(id_profesional: string, id_paciente: string): Promise<ResultadosMedEntity[]>;
    abstract getResultadosMedById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<ResultadosMedEntity | null>;
    abstract createResultadosMed(id_profesional: string, createMedicionesAllDto: CreateMedicionesAllDto): Promise<void>;
    abstract updateResultadosMed(id_profesional: string,  updateMediciones: any): Promise<void>;
    abstract deleteResultadosMed(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void>;
}