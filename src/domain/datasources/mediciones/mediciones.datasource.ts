//domain - local
import { MedicionesEntity } from "../../entities/mediciones.entity";
//presentation
import { CreateMedicionesDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

export abstract class MedicionesDatasource{
    abstract getMediciones(): Promise<MedicionesEntity[]>;
    abstract getMedicionesById(id: number): Promise<MedicionesEntity | null>;
    abstract createMediciones(medicion: CreateMedicionesDto): Promise<void>;
    abstract updateMediciones(id: number, medicion: any): Promise<void>;
    abstract deleteMediciones(id: number): Promise<void>;

}