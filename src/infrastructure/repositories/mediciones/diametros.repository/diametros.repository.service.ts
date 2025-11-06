//nest
import { Injectable } from '@nestjs/common';
//domain
import { DiametrosRepository } from 'src/domain';
import { DiametrosEntity } from 'src/domain';
//infrastructure - local
import { DiametrosDatasourceService } from 'src/infrastructure';
//presentation
import { CreateDiametrosDto } from 'src/domain';

@Injectable()
export class DiametrosRepositoryService implements DiametrosRepository  {

    constructor(
        private readonly diametrosDatasourceService: DiametrosDatasourceService
    ){}

    async getDiametros(id_profesional: string, id_paciente: string): Promise<DiametrosEntity[]> {
        return this.diametrosDatasourceService.getDiametros(id_profesional, id_paciente);
    }
    async getDiametrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<DiametrosEntity | null> {
        return this.diametrosDatasourceService.getDiametrosById(id_profesional, id_paciente, id_medicion);
    }
    async createDiametros(id_profesional: string, createDiametrosDto: CreateDiametrosDto): Promise<void> {
        return this.diametrosDatasourceService.createDiametros(id_profesional, createDiametrosDto);
    }
    async updateDiametros(id_profesional: string, updateDiametrosDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteDiametros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}