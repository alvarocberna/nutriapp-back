//nest
import { Injectable } from '@nestjs/common';
//domain
import { PlieguesRepository } from 'src/domain';
import { PlieguesEntity } from 'src/domain';
//infrastructure - local
import { PlieguesDatasourceService } from 'src/infrastructure';
//presentation
import { CreatePlieguesDto } from 'src/presentation/mediciones/dto/create-mediciones.dto';

@Injectable()
export class PlieguesRepositoryService implements PlieguesRepository  {

    constructor(
        private readonly plieguesDatasourceService: PlieguesDatasourceService
    ){}

    async getPliegues(): Promise<PlieguesEntity[]> {
        return this.plieguesDatasourceService.getPliegues();
    }
    async getPlieguesById(id: number): Promise<PlieguesEntity | null> {
        return this.plieguesDatasourceService.getPlieguesById(id);
    }
    async createPliegues(medicion: CreatePlieguesDto): Promise<void> {
        return this.plieguesDatasourceService.createPliegues(medicion);
    }
    async updatePliegues(id: number, medicion: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePliegues(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}