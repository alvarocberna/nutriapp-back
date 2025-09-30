//nest
import { Injectable } from '@nestjs/common';
//domain
import { DiametrosRepository } from 'src/domain';
import { DiametrosEntity } from 'src/domain';
//infrastructure - local
import { DiametrosDatasourceService } from 'src/infrastructure';
//presentation
import { CreateDiametrosDto } from 'src/presentation/mediciones/dto/create-mediciones.dto';

@Injectable()
export class DiametrosRepositoryService implements DiametrosRepository  {

    constructor(
        private readonly diametrosDatasourceService: DiametrosDatasourceService
    ){}

    async getDiametros(): Promise<DiametrosEntity[]> {
        return this.diametrosDatasourceService.getDiametros();
    }
    async getDiametrosById(id: number): Promise<DiametrosEntity | null> {
        return this.diametrosDatasourceService.getDiametrosById(id);
    }
    async createDiametros(medicion: CreateDiametrosDto): Promise<void> {
        return this.diametrosDatasourceService.createDiametros(medicion);
    }
    async updateDiametros(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteDiametros(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}