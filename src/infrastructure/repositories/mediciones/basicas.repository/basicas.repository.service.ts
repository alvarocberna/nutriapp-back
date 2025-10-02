//nest
import { Injectable } from '@nestjs/common';
//domain
import { BasicasRepository } from 'src/domain';
import { BasicasEntity } from 'src/domain';
//infrastructure - local
import { BasicasDatasourceService } from 'src/infrastructure';
//presentation
import { CreateBasicasDto } from 'src/presentation/mediciones/dto/create-mediciones.dto';

@Injectable()
export class BasicasRepositoryService implements BasicasRepository  {

    constructor(
        private readonly basicasDatasourceService: BasicasDatasourceService
    ){}

    async getBasicas(): Promise<BasicasEntity[]> {
        return this.basicasDatasourceService.getBasicas();
    }
    async getBasicasById(id: number): Promise<BasicasEntity | null> {
        return this.basicasDatasourceService.getBasicasById(id);
    }
    async createBasicas(medicion: CreateBasicasDto): Promise<void> {
        return this.basicasDatasourceService.createBasicas(medicion);
    }
    async updateBasicas(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteBasicas(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}