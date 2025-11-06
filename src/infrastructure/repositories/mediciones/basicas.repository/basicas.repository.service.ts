//nest
import { Injectable } from '@nestjs/common';
//domain
import { BasicasRepository } from 'src/domain';
import { BasicasEntity } from 'src/domain';
//infrastructure - local
import { BasicasDatasourceService } from 'src/infrastructure';
//presentation
import { CreateBasicasDto } from 'src/domain';

@Injectable()
export class BasicasRepositoryService implements BasicasRepository  {

    constructor(
        private readonly basicasDatasourceService: BasicasDatasourceService
    ){}

    async getBasicas(): Promise<BasicasEntity[]> {
        return this.basicasDatasourceService.getBasicas();
    }
    async getBasicasById(id_profesional: string, id_paciente: string, id_medicion: number): Promise<BasicasEntity | null> {
        return this.basicasDatasourceService.getBasicasById(id_profesional, id_paciente, id_medicion);
    }
    async createBasicas(id_profesional: string, createBasicasDto: CreateBasicasDto): Promise<void> {
        return this.basicasDatasourceService.createBasicas(id_profesional, createBasicasDto);
    }
    async updateBasicas(id_profesional: string, updateBasicasDto: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteBasicas(id_profesional: string, id_paciente: string, id_medicion: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}