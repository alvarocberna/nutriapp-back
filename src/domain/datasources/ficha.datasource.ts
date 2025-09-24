//local
import { FichaEntity } from "../entities/ficha.entity";

export abstract class FichaDatasource{
    abstract getFichas(): Promise<FichaEntity[]>;
    abstract getFichaById(id: string): Promise<FichaEntity>;
    abstract createFicha(ficha: FichaEntity): Promise<void>;
    abstract updateFicha(id: string, ficha: any): Promise<void>;
    abstract deleteFicha(id: string): Promise<void>;

}