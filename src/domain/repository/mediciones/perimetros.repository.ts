//domain - local
import { PerimetrosEntity } from "../../entities/perimetros.entity";
//presentation
import { CreatePerimetrosDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

export abstract class PerimetrosRepository{
    abstract getPerimetros(): Promise<PerimetrosEntity[]>;
    abstract getPerimetrosById(id: number): Promise<PerimetrosEntity | null>;
    abstract createPerimetros(medicion: CreatePerimetrosDto): Promise<void>;
    abstract updatePerimetros(id: number, medicion: any): Promise<void>;
    abstract deletePerimetros(id: number): Promise<void>;
}