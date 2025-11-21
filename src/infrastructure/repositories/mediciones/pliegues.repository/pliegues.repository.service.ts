//nest
import { Injectable } from '@nestjs/common';
//domain
import { PlieguesRepository } from 'src/domain';
import { PlieguesEntity } from 'src/domain';
//infrastructure - local
import { PlieguesDatasourceService } from 'src/infrastructure';
//presentation
import { CreatePlieguesDto } from 'src/domain';

@Injectable()
export class PlieguesRepositoryService implements PlieguesRepository  {

    constructor(
        private readonly plieguesDatasourceService: PlieguesDatasourceService
    ){}

    async getPliegues(id_profesional: string, id_paciente: string): Promise<PlieguesEntity[]> {
        return this.plieguesDatasourceService.getPliegues(id_profesional, id_paciente);
    }
    async getPlieguesById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<PlieguesEntity | null> {
        return this.plieguesDatasourceService.getPlieguesById(id_profesional, id_paciente, id_medicion);
    }
    async createPliegues(id_profesional: string, createPlieguesDto: CreatePlieguesDto): Promise<void> {
        return this.plieguesDatasourceService.createPliegues(id_profesional, createPlieguesDto);
    }
    async updatePliegues(id_profesional: string, updatePlieguesDto: any): Promise<any> {
        return this.plieguesDatasourceService.updatePliegues(id_profesional, updatePlieguesDto);
    }
    async deletePliegues(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}