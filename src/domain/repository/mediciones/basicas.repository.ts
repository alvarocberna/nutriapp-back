//domain - local
import { BasicasEntity } from "../../entities/basicas.entity";
//presentation
import { CreateBasicasDto } from "src/presentation/mediciones/dto/create-mediciones.dto";

export abstract class BasicasRepository{
    abstract getBasicas(): Promise<BasicasEntity[]>;
    abstract getBasicasById(id: number): Promise<BasicasEntity | null>;
    abstract createBasicas(medicion: CreateBasicasDto): Promise<void>;
    abstract updateBasicas(id: number, medicion: any): Promise<void>;
    abstract deleteBasicas(id: number): Promise<void>;
}