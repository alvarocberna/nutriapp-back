//domain - local
import { DiametrosEntity } from "../../entities/diametros.entity";
//presentation
import { CreateDiametrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

export abstract class DiametrosDatasource{
    abstract getDiametros(): Promise<DiametrosEntity[]>;
    abstract getDiametrosById(id: number): Promise<DiametrosEntity | null>;
    abstract createDiametros(medicion: CreateDiametrosDto): Promise<void>;
    abstract updateDiametros(id: number, medicion: any): Promise<void>;
    abstract deleteDiametros(id: number): Promise<void>;

}