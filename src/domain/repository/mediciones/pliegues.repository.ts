//domain - local
import { PlieguesEntity } from "../../entities/pliegues.entity";
//presentation
import { CreatePlieguesDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

export abstract class PlieguesRepository{
    abstract getPliegues(): Promise<PlieguesEntity[]>;
    abstract getPlieguesById(id: number): Promise<PlieguesEntity | null>;
    abstract createPliegues(medicion: CreatePlieguesDto): Promise<void>;
    abstract updatePliegues(id: number, medicion: any): Promise<void>;
    abstract deletePliegues(id: number): Promise<void>;
}