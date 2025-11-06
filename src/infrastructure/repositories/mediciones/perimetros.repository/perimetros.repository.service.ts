//nest
import { Injectable } from '@nestjs/common';
//domain
import { PerimetrosRepository } from 'src/domain';
import { PerimetrosEntity } from 'src/domain';
//infrastructure - local
import { PerimetrosDatasourceService } from 'src/infrastructure';
//presentation
import { CreatePerimetrosDto } from 'src/domain';

@Injectable()
export class PerimetrosRepositoryService implements PerimetrosRepository  {

    constructor(
        private readonly perimetrosDatasourceService: PerimetrosDatasourceService
    ){}

    async getPerimetros(id_profesional: string, id_paciente: string): Promise<PerimetrosEntity[]> {
        return this.perimetrosDatasourceService.getPerimetros(id_profesional, id_paciente);
    }
    async getPerimetrosById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PerimetrosEntity | null> {
        return this.perimetrosDatasourceService.getPerimetrosById(id_profesional, id_paciente, id_medicion);
    }
    async createPerimetros(id_profesional: string, createPerimetrosDto: CreatePerimetrosDto): Promise<void> {
        return this.perimetrosDatasourceService.createPerimetros(id_profesional, createPerimetrosDto);
    }
    async updatePerimetros(id_profesional: string, updatePerimetrosDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePerimetros(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}